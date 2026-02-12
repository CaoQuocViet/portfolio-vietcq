import { getFileUrl } from '../../lib/pocketbase'

export function formatPostDate(dateString, dateLocale, monthFormat = 'long') {
  return new Date(dateString).toLocaleDateString(dateLocale, {
    year: 'numeric', month: monthFormat, day: 'numeric'
  })
}

export function getPostImageUrl(post) {
  return post.cover_image ? getFileUrl(post.collectionId, post.id, post.cover_image) : null
}

export function formatReadTime(post, t) {
  return typeof post.read_time === 'number'
    ? `${post.read_time} ${t('blog.minutesRead') || 'min read'}`
    : post.read_time
}

export function normalizePostTags(post) {
  return Array.isArray(post.tags)
    ? post.tags.map(t => typeof t === 'object' ? t.name : t).filter(Boolean)
    : []
}
