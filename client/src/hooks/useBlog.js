import { useQuery } from '@tanstack/react-query'

const fetchPosts = async () => {
    const res = await fetch('/data/blog/posts.json')
    if (!res.ok) throw new Error('Failed to fetch blog posts')
    return res.json()
}

export const useBlog = () => {
    const { data: posts = [], isLoading: loading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })
    return { posts, loading, error: error?.message ?? null }
}

export const useBlogPost = (slug) => {
    const { data: post = null, isLoading: loading, error } = useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            const posts = await fetchPosts()
            const found = posts.find(p => p.slug === slug)
            if (!found) throw new Error('Blog post not found')
            return found
        },
        enabled: !!slug,
    })
    return { post, loading, error: error?.message ?? null }
}
