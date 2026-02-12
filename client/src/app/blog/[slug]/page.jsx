import BlogPost from '../../../components/blog/BlogPost'

export default async function BlogPostPage({ params }) {
    const { slug } = await params
    return <BlogPost slug={slug} />
}
