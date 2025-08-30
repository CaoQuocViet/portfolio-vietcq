import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Sử dụng GitHub API để quét thư mục projects một cách động
        const githubApiUrl = 'https://api.github.com/repos/CaoQuocViet/caoquocviet/contents/img/projects'
        
        const response = await fetch(githubApiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch projects from GitHub')
        }

        const projectsData = await response.json()
        const projects = []

        // Quét qua từng project folder
        for (const project of projectsData) {
            if (project.type === 'dir') {
                try {
                    // Lấy danh sách hình ảnh trong project folder
                    const imagesResponse = await fetch(project.url, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'Portfolio-App'
                        }
                    })

                    if (imagesResponse.ok) {
                        const imagesData = await imagesResponse.json()
                        
                        // Lọc và sắp xếp hình ảnh
                        const images = imagesData
                            .filter(file => 
                                file.type === 'file' && 
                                /\.(png|jpg|jpeg)$/i.test(file.name) &&
                                file.name.match(new RegExp(`^${project.name}-\\d+\\.(png|jpg|jpeg)$`, 'i'))
                            )
                            .sort((a, b) => {
                                // Sắp xếp theo số thứ tự trong tên file
                                const aNum = parseInt(a.name.match(/(\d+)/)?.[1] || '0')
                                const bNum = parseInt(b.name.match(/(\d+)/)?.[1] || '0')
                                return aNum - bNum
                            })
                            .map((file, index) => {
                                const match = file.name.match(/(\d+)\.(\w+)$/)
                                const number = match ? parseInt(match[1]) : index + 1
                                const extension = match ? match[2] : 'png'
                                
                                return {
                                    src: `https://raw.githubusercontent.com/CaoQuocViet/caoquocviet/main/img/projects/${project.name}/${file.name}`,
                                    title: file.name.replace(/\.(png|jpg|jpeg)$/i, ''),
                                    alt: `${project.name.charAt(0).toUpperCase() + project.name.slice(1)} Project - Screen ${number}`,
                                    project: project.name,
                                    number: number,
                                    extension: extension
                                }
                            })

                        if (images.length > 0) {
                            projects.push({
                                folder: project.name,
                                images: images
                            })
                        }
                    }
                } catch (error) {
                    console.error(`Error processing project ${project.name}:`, error)
                    continue
                }
            }
        }

        return NextResponse.json({ projects })
    } catch (error) {
        console.error('Error loading project images from GitHub API:', error)
        return NextResponse.json({ projects: [] }, { status: 500 })
    }
}
