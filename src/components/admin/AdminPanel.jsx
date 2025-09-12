'use client'
import { useState, useEffect } from 'react'
import AdminAuth from './AdminAuth'
import BlogEditor from './BlogEditor'

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentView, setCurrentView] = useState('list') // 'list', 'create', 'edit'
    const [editingPost, setEditingPost] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        // Check if already authenticated
        const authState = sessionStorage.getItem('adminAuth')
        if (authState === 'true') {
            setIsAuthenticated(true)
            fetchPosts()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/admin/posts')
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.error('Error fetching posts:', error)
            setError('Failed to fetch posts')
        } finally {
            setLoading(false)
        }
    }

    const handleAuthSuccess = () => {
        setIsAuthenticated(true)
        fetchPosts()
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth')
        setIsAuthenticated(false)
        setPosts([])
        setCurrentView('list')
        setEditingPost(null)
    }

    const handleCreatePost = async (postData) => {
        try {
            const response = await fetch('/api/admin/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })

            const data = await response.json()

            if (data.success) {
                await fetchPosts() // Refresh posts
                setCurrentView('list')
                setError('')
            } else {
                setError(data.message || 'Failed to create post')
            }
        } catch (error) {
            console.error('Error creating post:', error)
            setError('Network error. Please try again.')
        }
    }

    const handleUpdatePost = async (postData) => {
        try {
            const response = await fetch('/api/admin/posts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })

            const data = await response.json()

            if (data.success) {
                await fetchPosts() // Refresh posts
                setCurrentView('list')
                setEditingPost(null)
                setError('')
            } else {
                setError(data.message || 'Failed to update post')
            }
        } catch (error) {
            console.error('Error updating post:', error)
            setError('Network error. Please try again.')
        }
    }

    const handleDeletePost = async (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            const response = await fetch(`/api/admin/posts?id=${postId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (data.success) {
                await fetchPosts() // Refresh posts
                setError('')
            } else {
                setError(data.message || 'Failed to delete post')
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            setError('Network error. Please try again.')
        }
    }

    const handleEditPost = (post) => {
        setEditingPost(post)
        setCurrentView('edit')
    }

    const handleCancelEdit = () => {
        setCurrentView('list')
        setEditingPost(null)
        setError('')
    }

    if (!isAuthenticated) {
        return <AdminAuth onAuthSuccess={handleAuthSuccess} />
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Blog Admin Panel</h1>
                            <p className="text-gray-400">Manage your blog posts</p>
                        </div>
                        
                        <div className="flex gap-4">
                            {currentView === 'list' && (
                                <button
                                    onClick={() => setCurrentView('create')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Create New Post
                                </button>
                            )}
                            
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="max-w-6xl mx-auto mb-6">
                    <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
                        {error}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="max-w-6xl mx-auto">
                {currentView === 'list' && (
                    <PostsList 
                        posts={posts} 
                        loading={loading}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        formatDate={formatDate}
                    />
                )}

                {currentView === 'create' && (
                    <BlogEditor
                        onSave={handleCreatePost}
                        onCancel={handleCancelEdit}
                    />
                )}

                {currentView === 'edit' && editingPost && (
                    <BlogEditor
                        post={editingPost}
                        onSave={handleUpdatePost}
                        onCancel={handleCancelEdit}
                    />
                )}
            </div>
        </div>
    )
}

const PostsList = ({ posts, loading, onEdit, onDelete, formatDate }) => {
    if (loading) {
        return (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading posts...</p>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h2 className="text-white text-2xl font-bold mb-2">No Posts Yet</h2>
                <p className="text-gray-400">Create your first blog post to get started!</p>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">All Posts ({posts.length})</h2>
            </div>
            
            <div className="divide-y divide-gray-700">
                {posts.map(post => (
                    <div key={post.id} className="p-6 hover:bg-gray-750 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        {post.title}
                                    </h3>
                                    {post.featured && (
                                        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                
                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>{formatDate(post.date)}</span>
                                    <span>•</span>
                                    <span>{post.category}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                    <span>•</span>
                                    <span>{post.tags.length} tags</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => onEdit(post)}
                                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(post.id)}
                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminPanel
