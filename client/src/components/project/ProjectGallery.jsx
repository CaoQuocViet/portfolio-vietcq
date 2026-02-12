import Gallery from '../Gallery'

export default function ProjectGallery({ theme, projectData }) {
    return (
        <section id="gallery" className="bg-gray-200 dark:bg-gray-900">
            <Gallery projectFilter={projectData.id} showDock={false} />
        </section>
    )
}
