'use client'
import { useMemo } from 'react'
import { MessageCircle } from 'lucide-react'
import { useBlogComments } from '../../hooks/use-blog-comments'
import { useTranslation } from '../../hooks/useTranslation'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const BlogComments = ({ postId }) => {
  const { t } = useTranslation()
  const { comments, isLoading } = useBlogComments(postId)

  // Separate top-level comments and replies
  const { topLevel, repliesByParent } = useMemo(() => {
    const top = []
    const replies = {}
    for (const c of comments) {
      if (c.parent_id) {
        ;(replies[c.parent_id] ||= []).push(c)
      } else {
        top.push(c)
      }
    }
    return { topLevel: top, repliesByParent: replies }
  }, [comments])

  const count = comments.length

  return (
    <section className="mt-12 pt-8 border-t border-[var(--border-default)]">
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--text-heading)] mb-6">
        <MessageCircle className="w-5 h-5" />
        {t('blog.comments')} {count > 0 && <span className="text-sm font-normal text-[var(--text-muted)]">({count})</span>}
      </h2>

      {/* New comment form */}
      <div className="mb-8">
        <p className="text-sm text-[var(--text-muted)] mb-3">{t('blog.writeComment')}</p>
        <CommentForm postId={postId} />
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-section-alt)]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-[var(--bg-section-alt)]" />
                <div className="h-3 w-full rounded bg-[var(--bg-section-alt)]" />
              </div>
            </div>
          ))}
        </div>
      ) : topLevel.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] text-center py-6">{t('blog.noComments')}</p>
      ) : (
        <div className="space-y-6">
          {topLevel.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={repliesByParent[comment.id] || []}
              postId={postId}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogComments
