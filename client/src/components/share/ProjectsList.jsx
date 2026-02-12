"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from "../ui/loading";
import { useLanguage } from "../../contexts/LanguageContext";

const ProjectsList = ({ theme }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { language } = useLanguage();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                
                // Use API route to get project list dynamically with language
                const response = await fetch(`/api/projects?lang=${language}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects || []);
                } else {
                    throw new Error('Failed to fetch projects');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [language]);

    const handleProjectClick = (projectId) => {
        router.push(`/project/${projectId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-4">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                No projects found
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                No projects found
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {projects.map((project) => (
                <div
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                              rounded-2xl p-6 
                              transition-all duration-500 shadow-lg hover:shadow-2xl 
                              hover:-translate-y-2 hover:scale-[1.02] cursor-pointer
                              hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20
                              before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
                              before:from-blue-500/5 before:to-purple-500/5 before:opacity-0 
                              hover:before:opacity-100 before:transition-opacity before:duration-500"
                >
                    {/* Project Name */}
                    <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white 
                                  group-hover:text-blue-600 dark:group-hover:text-blue-400 
                                  transition-colors duration-300">
                        {project.name}
                    </h4>
                    
                    {/* Project Tagline */}
                    {project.tagline && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed
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
