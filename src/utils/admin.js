// Simple hash function for client-side hashing
export const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password + 'vietcq-admin-salt')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

// Verify password
export const verifyPassword = async (password, hash) => {
    const hashedInput = await hashPassword(password)
    return hashedInput === hash
}

// Generate slug from title
export const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// Format date for blog posts
export const formatDateForBlog = (date) => {
    return new Date(date).toISOString().split('T')[0]
}

// Validate blog post data
export const validateBlogPost = (post) => {
    const errors = []
    
    if (!post.title || post.title.trim().length === 0) {
        errors.push('Title is required')
    }
    
    if (!post.content || post.content.trim().length === 0) {
        errors.push('Content is required')
    }
    
    if (!post.excerpt || post.excerpt.trim().length === 0) {
        errors.push('Excerpt is required')
    }
    
    if (!post.category || post.category.trim().length === 0) {
        errors.push('Category is required')
    }
    
    if (!post.tags || post.tags.length === 0) {
        errors.push('At least one tag is required')
    }
    
    return errors
}
