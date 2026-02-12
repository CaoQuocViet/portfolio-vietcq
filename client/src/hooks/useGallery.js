import { useQuery } from '@tanstack/react-query'

export function useGallery(projectId = null) {
    const { data: images = [], isLoading: loading, error } = useQuery({
        queryKey: ['gallery', projectId],
        queryFn: async () => {
            const url = projectId
                ? `/api/gallery?projectId=${projectId}`
                : '/api/gallery'
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch images')
            const data = await res.json()

            if (projectId) return data.images || []
            const all = []
            data.projects?.forEach(p => all.push(...p.images))
            return all
        },
    })

    return { images, loading, error: error?.message ?? null }
}
