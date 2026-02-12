'use client'
import Dock from '../dock/Dock'
import GridBackground from '../ui/GridBackground'

const SkeletonCard = () => (
    <div className="rounded-2xl p-5 bg-[var(--bg-card)] border border-[var(--border-default)] space-y-3 motion-safe:animate-pulse">
        <div className="w-full aspect-[16/10] rounded-xl bg-[var(--bg-section-alt)]" />
        <div className="flex justify-between">
            <div className="h-3 w-20 rounded bg-[var(--bg-section-alt)]" />
            <div className="h-3 w-16 rounded bg-[var(--bg-section-alt)]" />
        </div>
        <div className="h-5 w-3/4 rounded bg-[var(--bg-section-alt)]" />
        <div className="h-3 w-full rounded bg-[var(--bg-section-alt)]" />
        <div className="h-3 w-2/3 rounded bg-[var(--bg-section-alt)]" />
    </div>
)

const BlogListLoadingState = ({ theme, setTheme, scrollToSection, navigationItems, t }) => (
    <>
        <Dock theme={theme} setTheme={setTheme} activeSection={null} scrollToSection={scrollToSection} navigationItems={navigationItems} />
        <div className="min-h-screen bg-[var(--bg-page)] relative" role="status" aria-label={t('blog.loadingPosts')}>
            <GridBackground theme={theme} />
            <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 pt-28 pb-16">
                <div className="text-center mb-12 motion-safe:animate-pulse">
                    <div className="h-12 w-56 mx-auto rounded-lg bg-[var(--bg-section-alt)] mb-4" />
                    <div className="h-5 w-72 mx-auto rounded bg-[var(--bg-section-alt)]" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        </div>
    </>
)

export default BlogListLoadingState
