import { useState, useEffect } from 'react'

export const useBlog = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch('/data/blog/posts.json')
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts')
                }
                
                const data = await response.json()
                setPosts(data)
                setError(null)
            } catch (err) {
                console.error('Error fetching blog posts:', err)
                setError(err.message)
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    return { posts, loading, error }
}

export const useBlogPost = (slug) => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await fetch('/data/blog/posts.json')
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blog post')
                }
                
                const data = await response.json()
                const foundPost = data.find(p => p.slug === slug)
                
                if (!foundPost) {
                    throw new Error('Blog post not found')
                }
                
                setPost(foundPost)
                setError(null)
            } catch (err) {
                console.error('Error fetching blog post:', err)
                setError(err.message)
                setPost(null)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchPost()
        }
    }, [slug])

    return { post, loading, error }
}
