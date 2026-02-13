'use client'
import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import CommentForm from './CommentForm'
import { useTranslation } from '../../hooks/useTranslation'

function gravatarUrl(email) {
  if (!email) return null
  // Simple hash for gravatar — use md5 in production or identicon fallback
  const hash = Array.from(email.trim().toLowerCase()).reduce(
    (h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0
  )
  return `https://www.gravatar.com/avatar/${Math.abs(hash).toString(16).padStart(32, '0')}?d=identicon&s=40`
}

function getInitials(name) {
  return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'
}

function timeAgo(dateStr, locale) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return locale === 'vi' ? 'Vừa xong' : 'Just now'
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d`
  return new Date(dateStr).toLocaleDateString()
}

const CommentItem = ({ comment, replies = [], postId, depth = 0 }) => {
  const { t, locale } = useTranslation()
  const [showReplyForm, setShowReplyForm] = useState(false)
  const avatarUrl = gravatarUrl(comment.author_email)

  return (
    <div className={depth > 0 ? 'ml-8 mt-3' : ''}>
      <div className="flex gap-3">
        {/* Avatar */}
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full shrink-0" />
        ) : (
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-medium bg-[var(--bg-section-alt)] text-[var(--text-muted)] border border-[var(--border-default)]">
            {getInitials(comment.author_name)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-[var(--text-heading)]">
              {comment.author_name}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {timeAgo(comment.created, locale)}
            </span>
          </div>

          {/* Content */}
          <p className="text-sm text-[var(--text-body)] whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          {/* Reply button (only for top-level) */}
          {depth === 0 && (
            <button
              onClick={() => setShowReplyForm(v => !v)}
              className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" />
              {t('blog.reply')}
            </button>
          )}

          {/* Inline reply form */}
          {showReplyForm && (
            <div className="mt-3">
              <CommentForm postId={postId} parentId={comment.id} onSuccess={() => setShowReplyForm(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} postId={postId} depth={1} />
      ))}
    </div>
  )
}

export default CommentItem
