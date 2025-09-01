import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');
        
        const projectsDir = path.join(process.cwd(), 'public', 'data', 'project-demo');
        
        if (!fs.existsSync(projectsDir)) {
            return NextResponse.json({ projects: [] });
        }

        const projects = [];
        
        // Get all project folders
        const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const folder of folders) {
            // If projectId is specified, only process that project
            if (projectId && folder !== projectId) {
                continue;
            }

            const folderPath = path.join(projectsDir, folder);
            
            try {
                const files = fs.readdirSync(folderPath)
                    .filter(file => {
                        const ext = path.extname(file).toLowerCase();
                        return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
                    })
                    .sort((a, b) => {
                        // Extract number from filename and sort
                        const aNum = parseInt(a.match(/(\d+)/)?.[1] || '0');
                        const bNum = parseInt(b.match(/(\d+)/)?.[1] || '0');
                        return aNum - bNum; // Ascending order
                    });

                if (files.length > 0) {
                    const images = files.map((file, index) => {
                        const match = file.match(/(\d+)\.(\w+)$/);
                        const number = match ? parseInt(match[1]) : index + 1;
                        const extension = path.extname(file).substring(1);
                        const baseName = path.basename(file, path.extname(file));
                        
                        return {
                            src: `/data/project-demo/${folder}/${file}`,
                            title: baseName,
                            alt: `${folder.charAt(0).toUpperCase() + folder.slice(1)} Project - Image ${number}`,
                            project: folder,
                            number: number,
                            extension: extension,
                            filename: file
                        };
                    });

                    projects.push({
                        folder,
                        images
                    });
                }
            } catch (error) {
                console.error(`Error reading folder ${folder}:`, error);
                continue;
            }
        }

        // If projectId was specified, return only that project's images
        if (projectId) {
            const project = projects.find(p => p.folder === projectId);
            return NextResponse.json({
                project: project || null,
                images: project ? project.images : []
            });
        }

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error scanning project images:', error);
        return NextResponse.json({ error: 'Failed to scan project images' }, { status: 500 });
    }
}
