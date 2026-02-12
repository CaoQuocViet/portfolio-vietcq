'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BlogListPagination = ({ page, totalPages, hasNextPage, hasPreviousPage, setPage, t }) => {
    if (totalPages <= 1) return null

    const btnBase = 'inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
    const btnActive = 'bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] shadow-sm'
    const btnDisabled = 'bg-[var(--bg-section-alt)] text-[var(--text-muted)] cursor-not-allowed'

    return (
        <nav className="flex justify-center items-center gap-4 mt-12" aria-label="Pagination">
            <button
                onClick={() => setPage(p => p - 1)}
                disabled={!hasPreviousPage}
                className={`${btnBase} ${hasPreviousPage ? btnActive : btnDisabled}`}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-4 h-4" />
                {t('blog.previous') || 'Previous'}
            </button>

            <span className="text-sm text-[var(--text-body)] font-medium tabular-nums" aria-live="polite">
                {t('blog.pageOf')?.replace('{page}', page).replace('{total}', totalPages) || `${page} / ${totalPages}`}
            </span>

            <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasNextPage}
                className={`${btnBase} ${hasNextPage ? btnActive : btnDisabled}`}
                aria-label="Next page"
            >
                {t('blog.next') || 'Next'}
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    )
}

export default BlogListPagination
