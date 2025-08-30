'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const ProjectGallery = ({ projectFilter = null }) => {
    const [hoveredTitle, setHoveredTitle] = useState('Hover over image to see details')
    const [galleryItems, setGalleryItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProjectImages = async () => {
            try {
                const response = await fetch('/api/gallery')
                if (!response.ok) throw new Error('Failed to load gallery data')
                
                const data = await response.json()
                
                // Filter by specific project if projectFilter is provided
                let filteredProjects = data.projects
                if (projectFilter) {
                    filteredProjects = data.projects.filter(project => project.folder === projectFilter)
                }
                
                // Flatten all images from filtered projects
                const allImages = []
                filteredProjects.forEach(project => {
                    allImages.push(...project.images)
                })
                
                setGalleryItems(allImages)
            } catch (err) {
                console.error('Error loading gallery:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadProjectImages()
    }, [projectFilter])

    if (loading) {
        return (
            <div className="gallery-container">
                <div className="title-card">
                    Loading gallery...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="gallery-container">
                <div className="title-card">
                    Error loading gallery: {error}
                </div>
            </div>
        )
    }

    return (
        <>
            <style jsx>{`
                .gallery-container {
                    width: 95%;
                    max-width: 1600px;
                    position: relative;
                    overflow: hidden;
                    padding: 30px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .title-card {
                    padding: 20px 30px;
                    border-radius: 12px;
                    margin-bottom: 25px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: #ffffff;
                    text-align: center;
                    min-height: 30px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .gallery-frame {
                    position: relative;
                    width: 100%;
                    padding-top: 32%;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }

                .gallery-images {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    gap: 2px;
                    padding: 2px;
                }

                .gallery-item {
                    position: relative;
                    height: 100%;
                    flex: 1;
                    transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    min-width: 0;
                    border-radius: 8px;
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                }

                .gallery-item:hover {
                    flex: 0 0 56.25% !important;
                    z-index: 1;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }

                .gallery-images:hover .gallery-item:not(:hover) {
                    flex: 0 0 3.55% !important;
                    opacity: 0.5;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: object-fit 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 6px;
                }

                .gallery-item:hover img {
                    object-fit: contain !important;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 10px;
                }

                .arrow-container {
                    text-align: center;
                    margin-top: 30px;
                    position: relative;
                }

                .arrow {
                    font-size: 90px;
                    color: transparent;
                    background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
                    background-size: 300% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: gradientMove 2s linear infinite;
                    display: inline-block;
                    transform: rotate(180deg);
                }

                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 300% 50%; }
                }

                @media (max-width: 768px) {
                    .gallery-container {
                        width: 100%;
                        padding: 15px;
                    }
                    
                    .title-card {
                        padding: 15px 20px;
                        font-size: 16px;
                    }

                    .title-card::after {
                        font-size: 20px;
                        right: 15px;
                    }
                    
                    .gallery-frame {
                        border-radius: 8px;
                    }
                    
                    .gallery-item {
                        border-radius: 6px;
                    }
                    
                    .gallery-item:hover {
                        border-radius: 8px;
                    }

                    .arrow {
                        font-size: 36px;
                    }
                }
            `}</style>
            
            <div className="gallery-container enhanced-card">
                <div className="title-card enhanced-card">
                    {hoveredTitle}
                </div>
                <div className="gallery-frame">
                    <div className="gallery-images">
                        {galleryItems.map((item, index) => (
                            <div 
                                key={`${item.project}-${item.number}-${index}`}
                                className="gallery-item"
                                onMouseEnter={() => setHoveredTitle(`${item.project}-${item.number}`)}
                                onMouseLeave={() => setHoveredTitle('Hover over image to see details')}
                                onClick={() => {
                                    window.location.href = `/project/${item.project}`;
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="arrow-container">
                    <div className="arrow">→</div>
                </div>
            </div>
        </>
    )
}

export default ProjectGallery

