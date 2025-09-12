import { BlogPost } from '../../../components/blog'

export default async function BlogPostPage({ params }) {
    const { slug } = await params
    return <BlogPost slug={slug} />
}
