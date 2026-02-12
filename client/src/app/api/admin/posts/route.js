import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const POSTS_PATH = path.join(process.cwd(), 'public/data/blog/posts.json')

export async function GET() {
    try {
        if (!fs.existsSync(POSTS_PATH)) {
            return NextResponse.json([])
        }
        
        const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST(request) {
    try {
        const newPost = await request.json()
        
        // Generate ID and slug if not provided
        if (!newPost.id) {
            newPost.id = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }
        
        if (!newPost.slug) {
            newPost.slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }
        
        // Add timestamp
        newPost.date = newPost.date || new Date().toISOString().split('T')[0]
        
        // Read existing posts
        let posts = []
        if (fs.existsSync(POSTS_PATH)) {
            posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
        }
        
        // Add new post
        posts.unshift(newPost) // Add to beginning
        
        // Write back to file
        fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2))
        
        return NextResponse.json({ success: true, post: newPost })
        
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const updatedPost = await request.json()
        
        // Read existing posts
        if (!fs.existsSync(POSTS_PATH)) {
            return NextResponse.json({ success: false, message: 'No posts found' }, { status: 404 })
        }
        
        const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
        
        // Find and update post
        const postIndex = posts.findIndex(post => post.id === updatedPost.id)
        if (postIndex === -1) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 })
        }
        
        posts[postIndex] = { ...posts[postIndex], ...updatedPost }
        
        // Write back to file
        fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2))
        
        return NextResponse.json({ success: true, post: posts[postIndex] })
        
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json({ success: false, message: 'Failed to update post' }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('id')
        
        if (!postId) {
            return NextResponse.json({ success: false, message: 'Post ID required' }, { status: 400 })
        }
        
        // Read existing posts
        if (!fs.existsSync(POSTS_PATH)) {
            return NextResponse.json({ success: false, message: 'No posts found' }, { status: 404 })
        }
        
        const posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'))
        
        // Filter out the post to delete
        const filteredPosts = posts.filter(post => post.id !== postId)
        
        if (filteredPosts.length === posts.length) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 })
        }
        
        // Write back to file
        fs.writeFileSync(POSTS_PATH, JSON.stringify(filteredPosts, null, 2))
        
        return NextResponse.json({ success: true, message: 'Post deleted successfully' })
        
    } catch (error) {
        console.error('Error deleting post:', error)
        return NextResponse.json({ success: false, message: 'Failed to delete post' }, { status: 500 })
    }
}
