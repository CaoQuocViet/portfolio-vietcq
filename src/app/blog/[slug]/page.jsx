import { BlogPost } from '../../../components/blog'

export default function BlogPostPage({ params }) {
    return <BlogPost slug={params.slug} />
}
