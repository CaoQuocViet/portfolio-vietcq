"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProjectsList = ({ theme }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                
                // Use API route to get project list dynamically
                const response = await fetch('/api/projects');
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
    }, []);

    const handleProjectClick = (projectId) => {
        router.push(`/project/${projectId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-4">
                <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${
                    theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
                }`} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`text-center py-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
                No projects found
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className={`text-center py-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
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
                    className="card-modern hover:card-glow transition-all duration-300 cursor-pointer"
                >
                    {/* Project Name */}
                    <h4 className="font-semibold text-base gradient-text truncate mb-3">
                        {project.name}
                    </h4>
                    
                    {/* Project Tagline */}
                    {project.tagline && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {project.tagline}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProjectsList;
