import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { searchPosts } from '../lib/api'

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export function useBlogSearch(query, { page = 1, perPage = 10 } = {}) {
  const debouncedQuery = useDebounce(query, 300)

  const result = useQuery({
    queryKey: ['blog-search', debouncedQuery, { page, perPage }],
    queryFn: () => searchPosts(debouncedQuery, { page, perPage }),
    enabled: debouncedQuery.length >= 2,
  })

  return {
    results: result.data?.items || [],
    totalItems: result.data?.totalItems || 0,
    totalPages: result.data?.totalPages || 0,
    isLoading: result.isLoading,
    error: result.error?.message || null,
    debouncedQuery,
  }
}
