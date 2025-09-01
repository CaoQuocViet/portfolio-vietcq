import Gallery from '../../components/Gallery'
import { getProjectImages } from '../../utils/Projectimage'

export default function GalleryPage() {
    // Get project images on server side for SSR
    const projects = getProjectImages()

    return <Gallery projects={projects} />
}
