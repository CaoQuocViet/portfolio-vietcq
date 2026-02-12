'use client'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Dock from '../dock/Dock'
import GridBackground from '../ui/GridBackground'

const BlogListErrorState = ({ theme, setTheme, scrollToSection, navigationItems, error, t }) => (
    <>
        <Dock theme={theme} setTheme={setTheme} activeSection={null} scrollToSection={scrollToSection} navigationItems={navigationItems} />
        <div className="min-h-screen flex justify-center items-center p-5 bg-[var(--bg-page)] relative">
            <GridBackground theme={theme} />
            <div className="text-center relative z-10" role="alert">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-[var(--text-heading)] text-2xl font-bold mb-2">{t('blog.errorTitle')}</h2>
                <p className="text-[var(--text-body)] mb-8 max-w-md text-sm">{t('blog.errorText') || 'Failed to load blog posts. Please try again.'}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary)] text-[var(--btn-primary-text)] rounded-lg hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 cursor-pointer text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    {t('blog.retry')}
                </button>
            </div>
        </div>
    </>
)

export default BlogListErrorState
