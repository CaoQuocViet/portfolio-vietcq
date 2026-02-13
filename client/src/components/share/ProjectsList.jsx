"use client";

import { useRouter } from 'next/navigation';
import { LoadingSpinner } from "../ui/loading";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from '../../hooks/useTranslation';
import { useProjects } from '../../hooks/use-projects';

const ProjectsList = ({ theme }) => {
    const router = useRouter();
    const { language } = useLanguage();
    const { t } = useTranslation();
    const { projects, isLoading, error } = useProjects(language);

    const handleProjectClick = (slug) => {
        router.push(`/project/${slug}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-4">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || projects.length === 0) {
        return (
            <div className="text-center py-4 text-[var(--text-secondary)]">
                {t('common.noProjectsFound')}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.slug)}
                    className="group relative bg-gradient-to-br from-[var(--bg-page)] to-[var(--bg-section-alt)]
                              rounded-2xl p-6
                              transition-all duration-500 shadow-lg hover:shadow-2xl
                              hover:-translate-y-2 hover:scale-[1.02] cursor-pointer
                              hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20
                              before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br
                              before:from-blue-500/5 before:to-purple-500/5 before:opacity-0
                              hover:before:opacity-100 before:transition-opacity before:duration-500"
                >
                    {/* Project Name */}
                    <h4 className="font-bold text-lg mb-3 text-[var(--text-heading)]
                                  group-hover:text-[var(--text-link)]
                                  transition-colors duration-300">
                        {project.name}
                    </h4>

                    {/* Project Tagline */}
                    {project.tagline && (
                        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed
                                      overflow-hidden"
                           style={{
                             display: '-webkit-box',
                             WebkitLineClamp: 2,
                             WebkitBoxOrient: 'vertical'
                           }}>
                            {project.tagline}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProjectsList;
