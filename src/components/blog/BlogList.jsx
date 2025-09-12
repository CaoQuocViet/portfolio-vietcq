'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/solid'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import GridBackground from '../ui/GridBackground'
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
                    className="min-h-screen flex justify-center items-center p-5 bg-white dark:bg-gray-950"
                >
                    <GridBackground theme={theme} />
                    <div className="text-center relative z-10">
                        <LoadingSpinner size="lg" />
                        <p className="text-gray-900 dark:text-white text-lg mt-4">Loading Blog Posts...</p>
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
                    className="min-h-screen flex justify-center items-center p-5 bg-white dark:bg-gray-950"
                >
                    <GridBackground theme={theme} />
                    <div className="text-center relative z-10">
                        <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
                        <h2 className="text-gray-900 dark:text-white text-2xl font-bold mb-2">Error Loading Blog</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
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

            <div className="min-h-screen bg-white dark:bg-gray-950 relative">
                <GridBackground theme={theme} />
                
                {/* Create Post Button - Fixed position */}
                <Link 
                    href="/admin"
                    className="fixed top-24 right-6 z-50 p-3 bg-indigo-600/90 hover:bg-indigo-700 text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                    <PlusIcon className="w-6 h-6" />
                </Link>

                <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center pt-24 pb-12">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                            Technical Blog
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Sharing insights, tutorials, and thoughts about software development
                        </p>
                    </div>                    {/* Filters */}
                    <div className="mb-8 space-y-4 px-4">
                        {/* Search */}
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        {/* Category and Tag filters */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
                            <h2 className="text-gray-900 dark:text-white text-xl md:text-2xl font-bold mb-2">No Posts Found</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4">
                            {sortedPosts.map(post => (
                                <BlogCard key={post.id} post={post} theme={theme} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer theme={theme} />
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
                    backdrop-filter backdrop-blur-lg border shadow-lg
                    ${theme === 'dark'
                        ? 'bg-gray-900/80 border-gray-700 hover:bg-gray-900/90 hover:border-gray-600'
                        : 'bg-white/80 border-gray-200 hover:bg-white/90 hover:border-gray-300'
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
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200"
                            >
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-500/30 text-gray-700 dark:text-gray-300">
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">By {post.author}</span>
                        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/20 px-2 py-1 rounded">
                            {post.category}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default BlogList
