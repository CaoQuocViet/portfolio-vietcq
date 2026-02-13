import { useQuery } from '@tanstack/react-query'
import { listGalleryImages } from '../lib/api'

export function useGallery() {
    const { data: images = [], isLoading: loading, error } = useQuery({
        queryKey: ['gallery'],
        queryFn: listGalleryImages,
        staleTime: 5 * 60 * 1000,
    })

    return { images, loading, error: error?.message ?? null }
}
