import { useQuery } from '@tanstack/react-query'
import { listPosts } from '../lib/api'

const esc = (v) => String(v).replace(/'/g, "\\'")

function buildFilter({ category, tag, featured, status = 'published', visibility = 'public' } = {}) {
  const parts = []
  if (status) parts.push(`status='${esc(status)}'`)
  if (visibility) parts.push(`visibility='${esc(visibility)}'`)
  if (category) parts.push(`category='${esc(category)}'`)
  if (tag) parts.push(`tags.name?='${esc(tag)}'`)
  if (featured !== undefined) parts.push(`featured=${!!featured}`)
  return parts.join(' && ')
}

export function useBlogPosts({ page = 1, perPage = 10, category, tag, featured, sort = '-published_at' } = {}) {
  const filter = buildFilter({ category, tag, featured })

  const query = useQuery({
    queryKey: ['posts', { page, perPage, category, tag, featured, sort }],
    queryFn: () => listPosts({ page, perPage, filter, sort }),
  })

  const data = query.data
  return {
    posts: data?.items || [],
    totalItems: data?.totalItems || 0,
    totalPages: data?.totalPages || 0,
    page: data?.page || page,
    hasNextPage: (data?.page || 1) < (data?.totalPages || 1),
    hasPreviousPage: (data?.page || 1) > 1,
    isLoading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  }
}
