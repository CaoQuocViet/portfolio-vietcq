'use client'
import { useTheme } from 'next-themes'

export default function ProjectCards({ projects }) {
    const { theme } = useTheme()

    if (!projects || projects.length === 0) return null

    return (
        <>
            <style jsx>{`
                .project-cards-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin: 0; /* No margin to not affect layout */
                    justify-content: center;
                    align-items: center;
                    padding: 0 20px;
                }

                .project-card {
                    height: 60px; /* Same as dock height */
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
                    
                    /* Beautiful gradient background using system colors */
                    background: ${theme === 'dark' 
                        ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)'
                        : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)'
                    };
                }

                .project-card:hover {
                    transform: translateY(-3px) scale(1.05);
                    border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.3)'};
                    /* Removed drop shadow */
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
                    
                    /* Text color */
                    color: #ffffff;
                    
                    /* Remove gradient text effect for simplicity */
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
                    .project-cards-container {
                        gap: 10px;
                        margin: 0; /* No margin */
                        padding: 0 15px;
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
            
            <div className="project-cards-container">
                {projects.map(project => (
                    <div 
                        key={project.name}
                        className="project-card"
                        onClick={() => {
                            window.location.href = `/project/${project.name}`;
                        }}
                    >
                        <div className="project-card-content">
                            <span>{project.name}</span>
                            <div className="project-card-count">
                                {project.count}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
