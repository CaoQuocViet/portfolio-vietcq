'use client'
import { useTheme } from 'next-themes'

export default function ProjectCards({ projects }) {
    const { theme } = useTheme()

    if (!projects || projects.length === 0) return null

    // Create 3 copies for seamless infinite scroll
    const tripleProjects = [...projects, ...projects, ...projects];

    return (
        <>
            <style jsx>{`
                @keyframes infiniteScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .scroll-container {
                    position: relative;
                    width: 100%;
                    height: 70px;
                    overflow: hidden;
                    margin-bottom: 20px;
                }

                .scroll-track {
                    display: flex;
                    gap: 20px;
                    animation: infiniteScroll 30s linear infinite;
                    will-change: transform;
                    width: fit-content;
                }

                .scroll-track:hover {
                    animation-play-state: paused;
                }

                .project-card {
                    height: 60px;
                    padding: 0 20px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    backdrop-filter: blur(10px);
                    position: relative;
                    overflow: hidden;
                    min-width: fit-content;
                    flex-shrink: 0;
                    
                    background: ${theme === 'dark' 
                        ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)'
                        : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)'
                    };
                }

                .project-card:hover {
                    transform: translateY(-3px) scale(1.05);
                    border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.3)'};
                }

                .project-card-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 600;
                    font-size: 16px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #ffffff;
                    white-space: nowrap;
                }

                .project-card-count {
                    background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'};
                    color: white;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    min-width: 20px;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .scroll-container {
                        height: 60px;
                    }
                    
                    .scroll-track {
                        gap: 15px;
                    }
                    
                    .project-card {
                        height: 50px;
                        padding: 0 15px;
                    }
                    
                    .project-card-content {
                        font-size: 14px;
                        gap: 8px;
                    }
                    
                    .project-card-count {
                        font-size: 11px;
                        padding: 3px 6px;
                    }
                }
            `}</style>
            
            <div className="scroll-container">
                <div className="scroll-track">
                    {tripleProjects.map((project, index) => (
                        <div 
                            key={`${project.name}-${index}`}
                            className="project-card"
                            onClick={() => {
                                window.location.href = `/project/${project.name}`;
                            }}
                        >
                            <div className="project-card-content">
                                <span>{project.name.replace(/-/g, ' ')}</span>
                                <div className="project-card-count">
                                    {project.count}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
