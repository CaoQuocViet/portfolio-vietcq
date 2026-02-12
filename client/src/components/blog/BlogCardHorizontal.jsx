'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowUpRight } from 'lucide-react'
import { formatPostDate, getPostImageUrl, formatReadTime } from './blog-card-utils'

const BlogCardHorizontal = ({ post, theme, isLatest = false, t, dateLocale }) => {
    const imageUrl = getPostImageUrl(post)
    const readTime = formatReadTime(post, t)

    return (
        <Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl">
            <article className={`relative overflow-hidden rounded-xl flex flex-col sm:flex-row gap-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-default)] hover:border-[var(--border-hover)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] ${isLatest ? 'ring-2 ring-blue-500/40' : ''}`}>
                {isLatest && (
                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                        {t('blog.latestBadge')}
                    </span>
                )}

                {imageUrl && (
                    <div className="relative w-full sm:w-60 aspect-video sm:aspect-[4/3] flex-shrink-0 overflow-hidden">
                        <Image src={imageUrl} alt={post.title} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    </div>
                )}

                <div className="flex-1 p-5 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <time dateTime={post.published_at}>{formatPostDate(post.published_at, dateLocale, 'short')}</time>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
                        {post.category && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                <span className="px-2 py-0.5 rounded-full font-medium bg-[var(--color-50)] text-[var(--color-600)] dark:bg-[var(--color-900)] dark:text-[var(--color-300)]">
                                    {post.category}
                                </span>
                            </>
                        )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-heading)] leading-snug line-clamp-2 tracking-tight">
                        {post.title}
                    </h3>

                    <p className="text-[var(--text-body)] text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-500)] dark:text-[var(--color-400)] mt-auto pt-1">
                        <span className="group-hover:underline underline-offset-4">{t('blog.readMore')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default BlogCardHorizontal
