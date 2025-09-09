'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Dock from './dock/Dock'
import { GALLERY_NAVIGATION_ITEMS } from '../config/navigation'
import { createScrollFunction } from '../utils/navigation'
import { useGallery } from '../hooks/useGallery'


const Gallery = ({ projectFilter = null, showDock = true }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [hoveredTitle, setHoveredTitle] = useState('Auto-scrolling gallery - hover to pause')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [hoveredIndex, setHoveredIndex] = useState(-1)
    
    // Use hook to fetch project images
    const { images: galleryItems, loading, error } = useGallery(projectFilter)
    
    // Calculate dynamic width based on number of images and container
    const calculateItemWidth = (totalImages) => {
        if (!totalImages || totalImages === 0) return 3.55
        
        if (totalImages === 1) return 100 // Chỉ có 1 ảnh thì full width
        
        const activeItemWidth = 56.25 // Ảnh được focus chiếm 56.25%
        const remainingWidth = 100 - activeItemWidth // 43.75% cho tất cả ảnh còn lại
        const inactiveItemCount = totalImages - 1
        
        // Tính toán width cơ bản cho mỗi ảnh inactive
        let baseWidth = remainingWidth / inactiveItemCount
        
        // Xử lý các trường hợp đặc biệt
        if (totalImages === 2) {
            // 2 ảnh: chia đều không gian còn lại
            return remainingWidth
        } else if (totalImages === 3) {
            // 3 ảnh: mỗi ảnh nhỏ chiếm ~22%
            return Math.max(20, baseWidth)
        } else if (totalImages <= 10) {
            // 4-10 ảnh: giữ kích thước hợp lý
            return Math.max(4, Math.min(12, baseWidth))
        } else if (totalImages <= 30) {
            // 11-30 ảnh: thu nhỏ dần
            return Math.max(1.8, Math.min(4, baseWidth))
        } else {
            // >30 ảnh: thu nhỏ tối đa nhưng vẫn nhìn thấy được
            return Math.max(0.8, Math.min(1.8, baseWidth))
        }
    }
    
    const itemWidth = calculateItemWidth(galleryItems?.length || 0)
    
    // Responsive breakpoint cho mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const mobileItemWidth = isMobile ? Math.max(itemWidth * 1.5, 5) : itemWidth
    
    useEffect(() => {
        setMounted(true)
    }, [])

    // Auto-scroll effect từ phải sang trái
    useEffect(() => {
        if (!galleryItems || galleryItems.length === 0 || !isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1
                if (nextIndex >= galleryItems.length) {
                    return 0 // Reset về đầu
                }
                return nextIndex
            })
        }, 800) // Mỗi 800ms chuyển ảnh

        return () => clearInterval(interval)
    }, [galleryItems, isAutoPlaying])

    // Update title khi currentIndex thay đổi
    useEffect(() => {
        if (galleryItems && galleryItems[currentIndex] && isAutoPlaying) {
            setHoveredTitle(`${galleryItems[currentIndex].project}-${galleryItems[currentIndex].number}`)
        }
    }, [currentIndex, galleryItems, isAutoPlaying])

    const scrollToSection = createScrollFunction();

    if (!mounted) return null

    // Loading state
    if (loading) {
        return (
            <>
                {showDock && (
                    <Dock 
                        theme={theme}
                        setTheme={setTheme}
                        activeSection={null}
                        scrollToSection={scrollToSection}
                        navigationItems={GALLERY_NAVIGATION_ITEMS}
                    />
                )}
                <div 
                    className={`min-h-screen flex justify-center items-center p-5`}
                    style={{
                        margin: 0,
                        background: theme === 'dark' 
                            ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                            : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                    }}
                >
                    <div className="text-center">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
                            theme === 'dark' ? 'border-cyan-400' : 'border-white'
                        }`} />
                        <p className="text-white text-lg">Loading Gallery...</p>
                    </div>
                </div>
            </>
        )
    }

    // Error state
    if (error) {
        return (
            <>
                {showDock && (
                    <Dock 
                        theme={theme}
                        setTheme={setTheme}
                        activeSection={null}
                        scrollToSection={scrollToSection}
                        navigationItems={GALLERY_NAVIGATION_ITEMS}
                    />
                )}
                <div 
                    className={`min-h-screen flex justify-center items-center p-5`}
                    style={{
                        margin: 0,
                        background: theme === 'dark' 
                            ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                            : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                    }}
                >
                    <div className="text-center">
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h2 className="text-white text-2xl font-bold mb-2">Error Loading Gallery</h2>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </>
        )
    }

    // Empty state
    if (!galleryItems || galleryItems.length === 0) {
        return (
            <>
                {showDock && (
                    <Dock 
                        theme={theme}
                        setTheme={setTheme}
                        activeSection={null}
                        scrollToSection={scrollToSection}
                        navigationItems={GALLERY_NAVIGATION_ITEMS}
                    />
                )}
                <div 
                    className={`min-h-screen flex justify-center items-center p-5`}
                    style={{
                        margin: 0,
                        background: theme === 'dark' 
                            ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                            : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                    }}
                >
                    <div className="text-center">
                        <div className="text-gray-400 text-6xl mb-4">📷</div>
                        <h2 className="text-white text-2xl font-bold mb-2">No Images Found</h2>
                        <p className="text-gray-300">
                            {projectFilter ? `No images found for project "${projectFilter}"` : 'No project images available'}
                        </p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {/* Dock Navigation - chỉ logo + home + theme */}
            {showDock && (
                <Dock 
                    theme={theme}
                    setTheme={setTheme}
                    activeSection={null} // Không track active section
                    scrollToSection={scrollToSection}
                    navigationItems={GALLERY_NAVIGATION_ITEMS}
                />
            )}

            {/* Main Content */}
            <div 
                id="gallery" 
                className="min-h-screen flex justify-center items-center p-5"
            >
                {/* Gallery Content */}
                <>
                    <style jsx>{`
                .gallery-container {
                    width: 95%;
                    max-width: 1600px;
                    position: relative;
                    overflow: hidden;
                    padding: 20px;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'};
                }

                .title-card {
                    padding: 20px 30px;
                    border-radius: 12px;
                    margin-bottom: 25px;
                    border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: #ffffff;
                    text-align: center;
                    min-height: 30px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    background: ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
                }

                .gallery-frame {
                    position: relative;
                    width: 100%;
                    padding-top: 36%;
                    border: 2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    border-radius: 16px;
                    overflow: hidden;
                    background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
                    box-shadow: ${theme === 'dark' ? '0 8px 25px rgba(0, 0, 0, 0.6)' : '0 8px 25px rgba(0, 0, 0, 0.2)'};
                    margin-bottom: 15px;
                }

                .gallery-images {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    ${galleryItems && galleryItems.length <= 3 
                        ? 'justify-content: center;' 
                        : galleryItems && galleryItems.length > 30
                            ? 'justify-content: flex-start; overflow-x: auto; scrollbar-width: none;'
                            : 'justify-content: flex-start;'
                    }
                    gap: 2px;
                    padding: 2px;
                }

                .gallery-images::-webkit-scrollbar {
                    display: none; /* Ẩn scrollbar trên webkit browsers */
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: 500;
                    opacity: 0.8;
                    z-index: 10;
                    pointer-events: none;
                    animation: fadeInOut 3s infinite;
                }

                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.9; }
                }

                .gallery-item {
                    position: relative;
                    height: 100%;
                    flex: 0 0 ${itemWidth}%;
                    transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
                    overflow: hidden;
                    min-width: 0;
                    border-radius: 8px;
                    border: 2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
                    box-shadow: ${theme === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.6)' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
                    cursor: pointer;
                    opacity: 0.5;
                }

                .gallery-item.active {
                    flex: 0 0 56.25% !important;
                    z-index: 1;
                    border-radius: 12px;
                    box-shadow: ${theme === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.8)' : '0 4px 8px rgba(0, 0, 0, 0.3)'};
                    border: 2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
                    opacity: 1;
                }

                .gallery-item:hover {
                    flex: 0 0 56.25% !important;
                    z-index: 1;
                    border-radius: 12px;
                    box-shadow: ${theme === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.8)' : '0 4px 8px rgba(0, 0, 0, 0.3)'};
                    border: 2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
                    opacity: 1;
                }

                .gallery-images:hover .gallery-item:not(:hover) {
                    flex: 0 0 ${itemWidth}% !important;
                    opacity: 0.5;
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 6px;
                }

                .gallery-item.active,
                .gallery-item:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                .gallery-item.active img,
                .gallery-item:hover img {
                    border-radius: 10px;
                }

                .arrow-container {
                    text-align: center;
                    margin-top: 0px;
                    position: relative;
                }

                .arrow {
                    font-size: 60px;
                    line-height: 1;
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
                        padding-top: 50%; /* Tăng chiều cao trên mobile */
                    }
                    
                    .gallery-item {
                        border-radius: 6px;
                        flex: 0 0 ${mobileItemWidth}% !important;
                    }
                    
                    .gallery-item:hover,
                    .gallery-item.active {
                        flex: 0 0 ${galleryItems && galleryItems.length <= 3 ? 70 : 65}% !important;
                        border-radius: 8px;
                    }

                    .gallery-images:hover .gallery-item:not(:hover) {
                        flex: 0 0 ${mobileItemWidth}% !important;
                    }

                    .arrow {
                        font-size: 30px;
                    }
                    
                    ${galleryItems && galleryItems.length > 30 ? `
                    .gallery-images {
                        overflow-x: scroll;
                        scrollbar-width: thin;
                    }
                    ` : ''}
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
                                className={`gallery-item ${index === currentIndex && isAutoPlaying ? 'active' : ''}`}
                                onMouseEnter={() => {
                                    setIsAutoPlaying(false)
                                    setHoveredIndex(index)
                                    setHoveredTitle(`${item.project}-${item.number}`)
                                }}
                                onMouseLeave={() => {
                                    setIsAutoPlaying(true)
                                    setHoveredIndex(-1)
                                    if (!galleryItems || galleryItems.length === 0) {
                                        setHoveredTitle('Auto-scrolling gallery - hover to pause')
                                    }
                                }}
                                onClick={() => {
                                    window.location.href = `/project/${item.project}`;
                                }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    style={{ 
                                        objectFit: (index === currentIndex && isAutoPlaying) || index === hoveredIndex ? 'contain' : 'cover',
                                        objectPosition: 'center'
                                    }}
                                    className="transition-all duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Scroll indicator for many images */}
                    {galleryItems && galleryItems.length > 20 && (
                        <div className="scroll-indicator">
                            <span>← Scroll to explore all {galleryItems.length} images →</span>
                        </div>
                    )}
                </div>
                <div className="arrow-container">
                    <div className="arrow">→</div>
                </div>
                </div>
                </> 
            </div>
        </>
    )
}

export default Gallery

