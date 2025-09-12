'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Dock from '../dock/Dock'
import { BLOG_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'
import { useBlogPost } from '../../hooks/useBlog'
import { LoadingSpinner } from '../ui/loading'
import 'highlight.js/styles/github-dark.css'

const BlogPost = ({ slug }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    const { post, loading, error } = useBlogPost(slug)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction()

    if (!mounted) return null

    if (loading) {
        return (
            <>
                <Dock 
                    theme={theme}
                    setTheme={setTheme}
                    activeSection={null}
                    scrollToSection={scrollToSection}
                    navigationItems={BLOG_NAVIGATION_ITEMS}
                />
                <div 
                    className="min-h-screen flex justify-center items-center p-5"
                    style={{
                        margin: 0,
                        background: theme === 'dark' 
                            ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                            : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                    }}
                >
                    <div className="text-center">
                        <LoadingSpinner size="lg" />
                        <p className="text-white text-lg mt-4">Loading Blog Post...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error || !post) {
        return (
            <>
                <Dock 
                    theme={theme}
                    setTheme={setTheme}
                    activeSection={null}
                    scrollToSection={scrollToSection}
                    navigationItems={BLOG_NAVIGATION_ITEMS}
                />
                <div 
                    className="min-h-screen flex justify-center items-center p-5"
                    style={{
                        margin: 0,
                        background: theme === 'dark' 
                            ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                            : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                    }}
                >
                    <div className="text-center">
                        <div className="text-red-400 text-6xl mb-4">📝</div>
                        <h2 className="text-white text-2xl font-bold mb-2">Post Not Found</h2>
                        <p className="text-gray-300 mb-4">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
                        <Link 
                            href="/blog"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <>
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={null}
                scrollToSection={scrollToSection}
                navigationItems={BLOG_NAVIGATION_ITEMS}
            />

            <div 
                className="min-h-screen p-5"
                style={{
                    margin: 0,
                    background: theme === 'dark' 
                        ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                        : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                }}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <div className="pt-20 mb-8">
                        <Link 
                            href="/blog"
                            className="inline-flex items-center text-white hover:text-indigo-300 transition-colors"
                        >
                            <span className="mr-2">←</span>
                            Back to Blog
                        </Link>
                    </div>

                    {/* Article */}
                    <article 
                        className={`
                            relative overflow-hidden rounded-2xl p-8 md:p-12
                            backdrop-filter backdrop-blur-lg border
                            ${theme === 'dark' 
                                ? 'bg-black/40 border-white/20' 
                                : 'bg-white/20 border-white/30'
                            }
                        `}
                    >
                        {/* Featured badge */}
                        {post.featured && (
                            <div className="absolute top-8 right-8 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                                Featured Post
                            </div>
                        )}

                        {/* Header */}
                        <header className="mb-8">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                                <span>{formatDate(post.date)}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                                <span>•</span>
                                <span className="bg-indigo-500/30 text-indigo-200 px-2 py-1 rounded">
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <p className="text-xl text-gray-300 mb-6">
                                {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <span 
                                        key={tag}
                                        className="text-sm px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center text-gray-400">
                                <span>By {post.author}</span>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.image && (
                            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div 
                            className={`
                                prose prose-lg max-w-none
                                ${theme === 'dark' 
                                    ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-indigo-300' 
                                    : 'prose-headings:text-gray-900 prose-p:text-gray-700'
                                }
                                prose-pre:bg-gray-900 prose-pre:text-gray-100
                                prose-code:bg-gray-800 prose-code:text-indigo-300 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-500/10 prose-blockquote:pl-4
                                prose-a:text-indigo-400 hover:prose-a:text-indigo-300
                                prose-headings:scroll-mt-20
                            `}
                        >
                            <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                    // Custom components for better styling
                                    h1: ({ children }) => (
                                        <h1 className="text-4xl font-bold mb-6 mt-8 text-white border-b border-gray-600 pb-2">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-3xl font-bold mb-4 mt-8 text-white">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-2xl font-bold mb-3 mt-6 text-white">
                                            {children}
                                        </h3>
                                    ),
                                    p: ({ children }) => (
                                        <p className="mb-4 text-gray-300 leading-relaxed">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="mb-4 space-y-2 text-gray-300">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="mb-4 space-y-2 text-gray-300">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="text-gray-300">
                                            {children}
                                        </li>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-indigo-500 bg-indigo-500/10 pl-4 py-2 my-4 italic text-gray-300">
                                            {children}
                                        </blockquote>
                                    ),
                                    code: ({ inline, children }) => {
                                        return inline ? (
                                            <code className="bg-gray-800 text-indigo-300 px-1 py-0.5 rounded text-sm">
                                                {children}
                                            </code>
                                        ) : (
                                            <code className="block">{children}</code>
                                        )
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Footer */}
                        <footer className="mt-12 pt-8 border-t border-gray-600">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="text-gray-400">
                                    <p>Published on {formatDate(post.date)} by {post.author}</p>
                                </div>
                                
                                <Link 
                                    href="/blog"
                                    className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <span className="mr-2">←</span>
                                    More Posts
                                </Link>
                            </div>
                        </footer>
                    </article>
                </div>
            </div>
        </>
    )
}

export default BlogPost
