'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowUpRight } from 'lucide-react'
import { formatPostDate, getPostImageUrl, formatReadTime } from './blog-card-utils'

const BlogCard = ({ post, theme, isLatest = false, t, dateLocale }) => {
    const imageUrl = getPostImageUrl(post)
    const readTime = formatReadTime(post, t)

    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl">
            <article className={`relative overflow-hidden rounded-2xl h-full flex flex-col cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-default)] hover:border-[var(--border-hover)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] ${isLatest ? 'ring-2 ring-blue-500/40' : ''}`}>
                {isLatest && (
                    <span className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                        {t('blog.latestBadge')}
                    </span>
                )}

                {imageUrl && (
                    <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
                        <Image src={imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent dark:from-zinc-900/60 dark:to-transparent" />
                    </div>
                )}

                <div className="p-5 flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <time dateTime={post.published_at}>{formatPostDate(post.published_at, dateLocale)}</time>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-divider)]" />
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-heading)] leading-snug line-clamp-2 tracking-tight">
                        {post.title}
                    </h3>

                    <p className="text-[var(--text-body)] text-sm leading-relaxed flex-1 line-clamp-2">
                        {post.excerpt}
                    </p>

                    {post.category && (
                        <span className="text-xs px-2.5 py-1 rounded-full self-start font-medium bg-[var(--bg-badge)] text-[var(--text-badge)] border border-[var(--border-default)]">
                            {post.category}
                        </span>
                    )}

                    <div className="pt-2 flex items-center gap-1 text-sm font-medium text-[var(--text-link)]">
                        <span className="group-hover:underline underline-offset-4">{t('blog.readMore')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default BlogCard
