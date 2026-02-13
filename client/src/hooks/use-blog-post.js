import { useQuery } from '@tanstack/react-query'
import { getPost } from '../lib/api'

export function useBlogPost(slug) {
  const query = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 min — individual posts change less often
  })

  return {
    post: query.data || null,
    isLoading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  }
}
