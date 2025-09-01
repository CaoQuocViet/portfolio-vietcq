import Gallery from '../Gallery'

export default function ProjectGallery({ theme, projectData }) {
    return (
        <section id="gallery" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <Gallery projectFilter={projectData.id} showDock={false} />
        </section>
    )
}
