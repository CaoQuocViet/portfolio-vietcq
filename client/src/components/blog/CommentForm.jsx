'use client'
import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useCreateComment } from '../../hooks/use-blog-comments'
import { useTranslation } from '../../hooks/useTranslation'

const STORAGE_KEY = 'blog_comment_user'

const CommentForm = ({ postId, parentId = null, onSuccess }) => {
  const { t } = useTranslation()
  const mutation = useCreateComment()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.name) setName(saved.name)
      if (saved.email) setEmail(saved.email)
    } catch { /* ignore */ }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() || !name.trim()) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }))
    } catch { /* ignore */ }

    const data = { post: postId, author_name: name.trim(), content: content.trim() }
    if (email.trim()) data.author_email = email.trim()
    if (parentId) data.parent_id = parentId

    mutation.mutate(data, {
      onSuccess: () => {
        setContent('')
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text" required maxLength={100} value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('blog.namePlaceholder')}
          className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--bg-section-alt)] text-[var(--text-body)] border border-[var(--border-input)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary)]"
        />
        <input
          type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('blog.emailPlaceholder')}
          className="flex-1 px-3 py-2 rounded-lg text-sm bg-[var(--bg-section-alt)] text-[var(--text-body)] border border-[var(--border-input)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary)]"
        />
      </div>
      <textarea
        required maxLength={2000} rows={3} value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('blog.commentPlaceholder')}
        className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--bg-section-alt)] text-[var(--text-body)] border border-[var(--border-input)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary)] resize-y min-h-[80px]"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending || !content.trim() || !name.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--btn-primary)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          {mutation.isPending ? t('blog.submitting') : t('blog.submit')}
        </button>
      </div>
      {mutation.isError && (
        <p className="text-sm text-[var(--color-error)]">{mutation.error?.message}</p>
      )}
    </form>
  )
}

export default CommentForm
