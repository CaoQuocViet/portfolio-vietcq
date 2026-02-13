import Gallery from '../Gallery'

export default function ProjectGallery({ theme, projectData }) {
    return (
        <section id="gallery" className="bg-[var(--bg-section-alt)]">
            <Gallery projectFilter={projectData.slug} showDock={false} />
        </section>
    )
}
