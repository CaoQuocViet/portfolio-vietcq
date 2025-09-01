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
        const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const folder of folders) {
            if (projectId && folder !== projectId) continue;

            const folderPath = path.join(projectsDir, folder);
            const files = fs.readdirSync(folderPath)
                .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
                .sort((a, b) => {
                    const aNum = parseInt(a.match(/(\d+)/)?.[1] || '0');
                    const bNum = parseInt(b.match(/(\d+)/)?.[1] || '0');
                    return aNum - bNum;
                });

            if (files.length > 0) {
                const images = files.map((file, index) => {
                    const number = parseInt(file.match(/(\d+)/)?.[1] || index + 1);
                    return {
                        src: `/data/project-demo/${folder}/${file}`,
                        title: path.basename(file, path.extname(file)),
                        alt: `${folder} Project - Image ${number}`,
                        project: folder,
                        number,
                        filename: file
                    };
                });

                projects.push({ folder, images });
            }
        }

        if (projectId) {
            const project = projects.find(p => p.folder === projectId);
            return NextResponse.json({ images: project?.images || [] });
        }

        return NextResponse.json({ projects });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to scan images' }, { status: 500 });
    }
}
