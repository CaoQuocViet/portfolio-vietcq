import { useState, useEffect } from 'react';

export function useGallery(projectId = null) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const url = projectId 
                    ? `/api/gallery?projectId=${projectId}`
                    : '/api/gallery';
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch images');
                
                const data = await response.json();
                
                if (projectId) {
                    setImages(data.images || []);
                } else {
                    const allImages = [];
                    data.projects?.forEach(project => {
                        allImages.push(...project.images);
                    });
                    setImages(allImages);
                }
            } catch (err) {
                setError(err.message);
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [projectId]);

    return { images, loading, error };
}
