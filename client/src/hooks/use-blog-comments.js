import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listComments, createComment } from '../lib/pocketbase'

export function useBlogComments(postId) {
  const query = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => listComments(postId),
    enabled: !!postId,
  })

  return {
    comments: query.data || [],
    isLoading: query.isLoading,
    error: query.error?.message || null,
  }
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.post] })
    },
  })
}
