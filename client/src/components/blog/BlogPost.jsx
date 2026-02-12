'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import { ArrowLeft, Share2, Check, Clock } from 'lucide-react'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import ErrorBoundary from '../ui/ErrorBoundary'
import { BLOG_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'
import { useBlogPost } from '../../hooks/use-blog-post'
import { LoadingSpinner } from '../ui/loading'
import { useTranslation } from '../../hooks/useTranslation'
import { formatPostDate, getPostImageUrl, normalizePostTags } from './blog-card-utils'
import 'highlight.js/styles/github-dark.css'

const BlogPost = ({ slug }) => {
    const { theme, setTheme } = useTheme()
    const { t, dateLocale } = useTranslation()
    const [mounted, setMounted] = useState(false)
    const [readProgress, setReadProgress] = useState(0)
    const [copied, setCopied] = useState(false)
    const { post, isLoading, error } = useBlogPost(slug)

    useEffect(() => { setMounted(true) }, [])

    const handleScroll = useCallback(() => {
        const el = document.documentElement
        const scrolled = el.scrollTop
        const total = el.scrollHeight - el.clientHeight
        setReadProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            await navigator.share({ title: post?.title, url })
        } else {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const scrollToSection = createScrollFunction()
    const dockProps = { theme, setTheme, activeSection: null, scrollToSection, navigationItems: BLOG_NAVIGATION_ITEMS }

    if (!mounted) return null

    if (isLoading) return (
        <>
            <Dock {...dockProps} />
            <div className="min-h-screen flex justify-center items-center bg-[var(--bg-page)]" role="status">
                <div className="text-center"><LoadingSpinner /><p className="text-[var(--text-body)] text-lg mt-4">{t('blog.loadingPosts')}</p></div>
            </div>
        </>
    )

    if (error || !post) return (
        <>
            <Dock {...dockProps} />
            <div className="min-h-screen flex justify-center items-center bg-[var(--bg-page)]">
                <div className="text-center px-4" role="alert">
                    <h2 className="text-[var(--text-heading)] text-2xl font-bold mb-2">{t('blog.postNotFound')}</h2>
                    <p className="text-[var(--text-body)] mb-8">{t('blog.postNotFoundText')}</p>
                    <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary)] text-[var(--btn-primary-text)] rounded-lg hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <ArrowLeft className="w-4 h-4" />{t('blog.backToBlog')}
                    </Link>
                </div>
            </div>
        </>
    )

    const coverUrl = getPostImageUrl(post)
    const tags = normalizePostTags(post)

    return (
        <ErrorBoundary>
            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[var(--border-default)]" aria-hidden="true">
                <div className="h-full bg-[var(--btn-primary)] transition-[width] duration-150 ease-out" style={{ width: `${readProgress}%` }} />
            </div>

            <Dock {...dockProps} />

            <main id="main-content" className="min-h-screen bg-[var(--bg-page)] overflow-x-hidden">
                {/* Top bar with back + share */}
                <div className="bg-[var(--bg-section)] border-b border-[var(--border-default)] sticky top-0 z-40">
                    <div className="px-4 md:px-6 max-w-4xl mx-auto flex items-center justify-between h-14">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-3 py-1.5 -ml-3 text-[var(--text-body)] hover:text-[var(--text-heading)]">
                            <ArrowLeft className="w-4 h-4" />{t('blog.backToBlog')}
                        </Link>
                        <button onClick={handleShare} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-[var(--text-body)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-section-alt)]" aria-label="Share this post">
                            {copied ? <><Check className="w-4 h-4 text-green-500" />Copied!</> : <><Share2 className="w-4 h-4" />Share</>}
                        </button>
                    </div>
                </div>

                {/* Article */}
                <div className="px-4 md:px-6 max-w-4xl mx-auto py-12">
                    <article className="motion-safe:animate-fade-in-up">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-body)] mb-6">
                            <time dateTime={post.published_at}>{formatPostDate(post.published_at, dateLocale)}</time>
                            {post.read_time && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-[var(--border-divider)]" />
                                    <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.read_time} min read</span>
                                </>
                            )}
                            {post.category && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-[var(--border-divider)]" />
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--bg-badge)] text-[var(--text-badge)] border border-[var(--border-default)]">{post.category}</span>
                                </>
                            )}
                            {post.featured && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-[var(--border-divider)]" />
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-warning)]/10 text-[var(--color-warning)] ring-1 ring-[var(--color-warning)]/20">{t('blog.featuredPost')}</span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text-heading)] leading-[1.15] tracking-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed mb-8">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-10">
                                {tags.map((tag, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-full font-medium bg-[var(--bg-section-alt)] text-[var(--text-body)] border border-[var(--border-default)]">#{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Cover image */}
                        {coverUrl && (
                            <div className="relative w-full aspect-[2/1] mb-12 rounded-2xl overflow-hidden border border-[var(--border-default)]">
                                <Image src={coverUrl} alt={post.title} fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" priority />
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg max-w-none prose-headings:text-[var(--text-heading)] prose-p:text-[var(--text-body)] prose-strong:text-[var(--text-heading)] prose-code:text-[var(--text-code)] prose-code:bg-[var(--bg-code-inline)] prose-a:text-[var(--text-link)] hover:prose-a:text-[var(--text-link-hover)] prose-pre:bg-[var(--bg-code-block)] prose-pre:rounded-xl prose-pre:ring-1 prose-pre:ring-[var(--border-default)] prose-code:px-1.5 prose-code:rounded prose-blockquote:border-l-[var(--btn-primary)] prose-blockquote:text-[var(--text-body)] prose-img:rounded-xl prose-hr:border-[var(--border-default)] prose-headings:tracking-tight">
                            <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]}>{post.content}</ReactMarkdown>
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 pt-8 border-t border-[var(--border-default)]">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <p className="text-sm text-[var(--text-body)]">Published on <time dateTime={post.published_at}>{formatPostDate(post.published_at, dateLocale)}</time></p>
                                <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary)] text-[var(--btn-primary-text)] rounded-lg hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                    <ArrowLeft className="w-4 h-4" />{t('blog.morePosts')}
                                </Link>
                            </div>
                        </footer>
                    </article>
                </div>
            </main>
            <Footer theme={theme} />
        </ErrorBoundary>
    )
}

export default BlogPost
