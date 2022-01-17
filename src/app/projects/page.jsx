import { Navigation } from "@/components/shared/nav";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export default function Projects() {
    return (
        <div className="min-h-screen bg-[rgb(var(--color-background))]">
            <Navigation />
            <ProjectsGrid />
        </div>
    );
}
