import { useQuery } from '@tanstack/react-query'
import { getStats } from '../lib/pocketbase'

export function useBlogStats() {
  const query = useQuery({
    queryKey: ['blog-stats'],
    queryFn: getStats,
    staleTime: 5 * 60 * 1000,
  })

  return {
    stats: query.data || null,
    isLoading: query.isLoading,
    error: query.error?.message || null,
  }
}
