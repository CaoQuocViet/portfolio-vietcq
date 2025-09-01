import { useState, useEffect } from 'react';

/**
 * Hook to fetch project images from API
 * @param {string|null} projectId - Specific project ID to filter, null for all projects  
 * @returns {Object} { projects, images, loading, error, refetch }
 */
export function useProjectImages(projectId = null) {
    const [projects, setProjects] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchImages = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const url = projectId 
                ? `/api/project-images?projectId=${encodeURIComponent(projectId)}`
                : '/api/project-images';
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch project images: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (projectId) {
                // Single project response
                setProjects(data.project ? [data.project] : []);
                setImages(data.images || []);
            } else {
                // All projects response
                setProjects(data.projects || []);
                // Flatten all images from all projects
                const allImages = [];
                if (data.projects) {
                    data.projects.forEach(project => {
                        allImages.push(...project.images);
                    });
                }
                setImages(allImages);
            }
            
        } catch (err) {
            console.error('Error fetching project images:', err);
            setError(err.message);
            setProjects([]);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [projectId]);

    return {
        projects,
        images,
        loading,
        error,
        refetch: fetchImages
    };
}
