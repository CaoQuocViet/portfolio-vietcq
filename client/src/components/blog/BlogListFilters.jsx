'use client'
import { Search, X } from 'lucide-react'

const BlogListFilters = ({
    theme,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    isSearchActive,
    t
}) => {
    return (
        <div className="pb-8 space-y-5">
            {/* Search */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-disabled)] pointer-events-none" aria-hidden="true" />
                    <input
                        type="text"
                        placeholder={t('blog.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label={t('blog.searchPlaceholder')}
                        className="w-full pl-11 pr-10 py-3 rounded-xl text-sm bg-[var(--bg-input)] text-[var(--text-heading)] placeholder-[var(--text-muted)] border border-[var(--border-default)] focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--border-focus)] focus:outline-none transition-[box-shadow] duration-200 shadow-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-heading)] cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category pills */}
            {!isSearchActive && categories.length > 0 && (
                <div className="flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${!selectedCategory ? 'bg-[var(--btn-primary)] text-[var(--btn-primary-text)] shadow-sm' : 'bg-[var(--bg-card)] text-[var(--text-body)] hover:text-[var(--text-heading)] border border-[var(--border-default)] hover:border-[var(--border-hover)]'}`}
                    >
                        {t('blog.allCategories')}
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${selectedCategory === cat ? 'bg-[var(--btn-primary)] text-[var(--btn-primary-text)] shadow-sm' : 'bg-[var(--bg-card)] text-[var(--text-body)] hover:text-[var(--text-heading)] border border-[var(--border-default)] hover:border-[var(--border-hover)]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BlogListFilters
