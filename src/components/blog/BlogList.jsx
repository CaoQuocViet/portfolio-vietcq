'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import Dock from '../dock/Dock'
import { BLOG_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'
import { useBlog } from '../../hooks/useBlog'
import { LoadingSpinner } from '../ui/loading'

const BlogList = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedTag, setSelectedTag] = useState('All')
    
    const { posts, loading, error } = useBlog()
    
    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction()

    // Filter posts based on search, category, and tag
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
        const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag)
        
        return matchesSearch && matchesCategory && matchesTag
    })

    // Get unique categories and tags
    const categories = ['All', ...new Set(posts.map(post => post.category))]
    const tags = ['All', ...new Set(posts.flatMap(post => post.tags))]

    // Sort posts by date (newest first) and featured posts first
    const sortedPosts = filteredPosts.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.date) - new Date(a.date)
    })

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
                        <p className="text-white text-lg mt-4">Loading Blog Posts...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error) {
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
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h2 className="text-white text-2xl font-bold mb-2">Error Loading Blog</h2>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </>
        )
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
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 pt-20">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Technical Blog
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                            Sharing insights, tutorials, and thoughts about software development
                        </p>
                        
                        {/* Create Post Button */}
                        <div className="flex justify-center">
                            <Link 
                                href="/admin"
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                <span className="mr-2">✏️</span>
                                Create Post
                            </Link>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 space-y-4">
                        {/* Search */}
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Category and Tag filters */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'All' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {tags.map(tag => (
                                    <option key={tag} value={tag}>
                                        {tag === 'All' ? 'All Tags' : tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    {sortedPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📝</div>
                            <h2 className="text-white text-2xl font-bold mb-2">No Posts Found</h2>
                            <p className="text-gray-300">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {sortedPosts.map(post => (
                                <BlogCard key={post.id} post={post} theme={theme} />
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <footer className="mt-16 py-8 border-t border-gray-600/30">
                    <div className="text-center text-gray-400">
                        <p>© 2025 Viet CQ. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

const BlogCard = ({ post, theme }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <article 
                className={`
                    group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer
                    backdrop-filter backdrop-blur-lg border
                    ${theme === 'dark' 
                        ? 'bg-black/40 border-white/20 hover:bg-black/60' 
                        : 'bg-white/20 border-white/30 hover:bg-white/30'
                    }
                    hover:scale-105 hover:shadow-2xl
                    ${post.featured ? 'ring-2 ring-yellow-400' : ''}
                `}
            >
                {post.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                    </div>
                )}

                {/* Image */}
                {post.image && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-300 text-sm line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                            <span 
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-indigo-500/30 text-indigo-200"
                            >
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-500/30 text-gray-300">
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                        <span className="text-sm text-gray-400">By {post.author}</span>
                        <span className="text-sm font-medium text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded">
                            {post.category}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default BlogList
