'use client'
import { useState, useEffect } from 'react'

const BlogEditor = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
        featured: false,
        author: 'Viet CQ',
        image: '',
        readTime: '5 min read'
    })
    const [tagInput, setTagInput] = useState('')
    const [loading, setSaving] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (post) {
            setFormData(post)
            setTagInput(post.tags ? post.tags.join(', ') : '')
        }
    }, [post])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Auto-generate slug from title
        if (name === 'title' && !post) {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }

    const handleTagsChange = (e) => {
        const value = e.target.value
        setTagInput(value)
        
        // Convert comma-separated string to array
        const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        setFormData(prev => ({ ...prev, tags }))
    }

    const validateForm = () => {
        const newErrors = []
        
        if (!formData.title.trim()) newErrors.push('Title is required')
        if (!formData.content.trim()) newErrors.push('Content is required')
        if (!formData.excerpt.trim()) newErrors.push('Excerpt is required')
        if (!formData.category.trim()) newErrors.push('Category is required')
        if (formData.tags.length === 0) newErrors.push('At least one tag is required')
        
        setErrors(newErrors)
        return newErrors.length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) return
        
        setSaving(true)
        try {
            await onSave(formData)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {errors.length > 0 && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <ul className="list-disc list-inside">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt *
                    </label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Brief description of the post"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category *
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., Development, Tutorial"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Read Time
                        </label>
                        <input
                            type="text"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g., 5 min read"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="/img/gif/showcase.gif"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags * (comma separated)
                    </label>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagsChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="React, JavaScript, Frontend"
                        required
                    />
                    {formData.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span key={index} className="bg-indigo-500/30 text-indigo-200 px-2 py-1 rounded text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                        Featured Post
                    </label>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Content * (Markdown supported)
                        </label>
                        <div className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded">
                            💡 Images: Use /img/path.jpg or /data/blog/images/filename.jpg
                        </div>
                    </div>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={20}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                        placeholder="Write your blog post content in Markdown...

Example image syntax:
![Alt text](/img/gif/showcase.gif)
![Blog image](/data/blog/images/your-image.jpg)

For code blocks:
```javascript
const example = 'Hello World'
```"
                        required
                    />
                </div>

                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogEditor
