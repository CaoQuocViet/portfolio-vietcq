import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), 'public', 'img', 'projects')
        
        if (!fs.existsSync(publicDir)) {
            return NextResponse.json({ projects: [] })
        }

        const projects = []
        const folders = fs.readdirSync(publicDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

        for (const folder of folders) {
            const folderPath = path.join(publicDir, folder)
            const files = fs.readdirSync(folderPath)
                .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
                .filter(file => file.startsWith(folder + '-')) // Only files matching pattern
                .sort((a, b) => {
                    // Extract number from filename and sort
                    const aNum = parseInt(a.match(/(\d+)/)?.[1] || '0')
                    const bNum = parseInt(b.match(/(\d+)/)?.[1] || '0')
                    return bNum - aNum // Descending order
                })

            if (files.length > 0) {
                const images = files.map(file => {
                    const match = file.match(/(\d+)\.(\w+)$/)
                    const index = match ? parseInt(match[1]) : 1
                    const extension = match ? match[2] : 'png'
                    return {
                        src: `/img/projects/${folder}/${file}`,
                        title: file.replace(/\.(png|jpg|jpeg)$/i, ''),
                        alt: `${folder.charAt(0).toUpperCase() + folder.slice(1)} Project - Screen ${index}`,
                        project: folder,
                        number: index,
                        extension: extension
                    }
                })

                projects.push({
                    folder,
                    images
                })
            }
        }

        return NextResponse.json({ projects })
    } catch (error) {
        console.error('Error scanning project images:', error)
        return NextResponse.json({ projects: [] }, { status: 500 })
    }
}
