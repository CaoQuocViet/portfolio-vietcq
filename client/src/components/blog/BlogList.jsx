'use client'
import { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { FileText } from 'lucide-react'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import GridBackground from '../ui/GridBackground'
import ErrorBoundary from '../ui/ErrorBoundary'
import BlogCard from './BlogCard'
import BlogCardHorizontal from './BlogCardHorizontal'
import BlogListFilters from './BlogListFilters'
import BlogListPagination from './BlogListPagination'
import BlogListLoadingState from './BlogListLoadingState'
import BlogListErrorState from './BlogListErrorState'
import { BLOG_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'
import { useBlogPosts } from '../../hooks/use-blog-posts'
import { useBlogSearch } from '../../hooks/use-blog-search'
import { useTranslation } from '../../hooks/useTranslation'

const LATEST_POSTS_COUNT = 3
const PER_PAGE = 10

const BlogList = () => {
    const { theme, setTheme } = useTheme()
    const { t, dateLocale } = useTranslation()
    const [mounted, setMounted] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [page, setPage] = useState(1)

    const scrollToSection = createScrollFunction()

    const searchResults = useBlogSearch(searchTerm, { page, perPage: PER_PAGE })
    const postsQuery = useBlogPosts({ page, perPage: PER_PAGE, category: selectedCategory || undefined, sort: '-published_at' })

    const isSearchActive = searchTerm.length >= 2
    const { posts, totalPages, hasNextPage, hasPreviousPage, isLoading, error } = isSearchActive
        ? { posts: searchResults.results, totalPages: searchResults.totalPages, hasNextPage: page < searchResults.totalPages, hasPreviousPage: page > 1, isLoading: searchResults.isLoading, error: searchResults.error }
        : postsQuery

    const categories = useMemo(() => {
        const seen = new Set()
        postsQuery.posts.forEach(p => { if (p.category) seen.add(p.category) })
        return [...seen]
    }, [postsQuery.posts])

    useEffect(() => setMounted(true), [])
    useEffect(() => setPage(1), [searchTerm, selectedCategory])

    if (!mounted) return null

    const mostRecentDate = posts.length > 0 ? posts[0].published_at : null
    const latestPosts = page === 1 && !isSearchActive ? posts.slice(0, LATEST_POSTS_COUNT) : []
    const olderPosts = page === 1 && !isSearchActive ? posts.slice(LATEST_POSTS_COUNT) : posts
    const hasActiveFilters = isSearchActive || selectedCategory

    if (isLoading && posts.length === 0) {
        return <BlogListLoadingState theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} navigationItems={BLOG_NAVIGATION_ITEMS} t={t} />
    }

    if (error) {
        return <BlogListErrorState theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} navigationItems={BLOG_NAVIGATION_ITEMS} error={error} t={t} />
    }

    return (
        <ErrorBoundary>
            <Dock theme={theme} setTheme={setTheme} activeSection={null} scrollToSection={scrollToSection} navigationItems={BLOG_NAVIGATION_ITEMS} />

            <main id="main-content" className="min-h-screen bg-[var(--bg-page)] overflow-x-hidden">
                {/* Hero section */}
                <div className="relative bg-[var(--bg-section)] border-b border-[var(--border-default)]">
                    <GridBackground theme={theme} />
                    <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
                        <header className="text-center pt-28 pb-8">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-blue-100 dark:to-zinc-400 bg-clip-text text-transparent">
                                {t('blog.title')}
                            </h1>
                            <p className="text-lg md:text-xl text-[var(--text-body)] max-w-xl mx-auto leading-relaxed">
                                {t('blog.subtitle')}
                            </p>
                        </header>

                        <BlogListFilters theme={theme} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} isSearchActive={isSearchActive} t={t} />
                    </div>
                </div>

                {/* Empty state */}
                {posts.length === 0 && (
                    <div className="text-center py-24 px-4">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--bg-section-alt)] flex items-center justify-center">
                            <FileText className="w-8 h-8 text-[var(--text-muted)]" />
                        </div>
                        <h2 className="text-[var(--text-heading)] text-xl font-bold mb-2">{t('blog.noPostsTitle')}</h2>
                        <p className="text-[var(--text-body)] text-sm mb-8 max-w-md mx-auto">{t('blog.noPostsText')}</p>
                        {hasActiveFilters && (
                            <button onClick={() => { setSearchTerm(''); setSelectedCategory('') }} className="px-5 py-2.5 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                {t('blog.clearFilters') || 'Clear filters'}
                            </button>
                        )}
                    </div>
                )}

                {/* Latest posts grid */}
                {latestPosts.length > 0 && (
                    <section className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto pt-16 pb-8" aria-labelledby="latest-heading">
                        <h2 id="latest-heading" className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-8">{t('blog.latestPosts')}</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {latestPosts.map((post, i) => (
                                <div key={post.id} className="motion-safe:animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                    <BlogCard post={post} theme={theme} isLatest={post.published_at === mostRecentDate} t={t} dateLocale={dateLocale} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Older posts list */}
                {olderPosts.length > 0 && (
                    <section className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto py-8 pb-16" aria-labelledby="older-heading">
                        <h2 id="older-heading" className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-8">
                            {isSearchActive ? t('blog.searchResults') || 'Search Results' : t('blog.olderPosts')}
                        </h2>
                        <div className="space-y-4">
                            {olderPosts.map((post, i) => (
                                <div key={post.id} className="motion-safe:animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                                    <BlogCardHorizontal post={post} theme={theme} isLatest={post.published_at === mostRecentDate} t={t} dateLocale={dateLocale} />
                                </div>
                            ))}
                        </div>
                        <BlogListPagination page={page} totalPages={totalPages} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} setPage={setPage} t={t} />
                    </section>
                )}
            </main>

            <Footer theme={theme} />
        </ErrorBoundary>
    )
}

export default BlogList
