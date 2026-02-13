import { useQuery } from '@tanstack/react-query'
import { listTags } from '../lib/api'

export function useBlogTags() {
  const query = useQuery({
    queryKey: ['tags'],
    queryFn: listTags,
    staleTime: 15 * 60 * 1000, // 15 min — tags change infrequently
  })

  return {
    tags: query.data || [],
    isLoading: query.isLoading,
    error: query.error?.message || null,
  }
}
