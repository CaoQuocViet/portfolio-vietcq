import GalleryPageClient from './GalleryPageClient'
import { getProjectImages } from '../../utils/imageUtils'

export default function GalleryPage() {
    // Get project images on server side
    const projects = getProjectImages()

    return <GalleryPageClient projects={projects} />
}
