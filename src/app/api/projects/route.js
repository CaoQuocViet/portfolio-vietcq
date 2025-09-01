import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
    try {
        const projectsDir = path.join(process.cwd(), 'public', 'data', 'project-detail');
        
        // Check if directory exists
        if (!fs.existsSync(projectsDir)) {
            return NextResponse.json({ projects: [] });
        }

        // Read all JSON files in the directory
        const files = fs.readdirSync(projectsDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        const projects = [];
        
        for (const file of jsonFiles) {
            try {
                const filePath = path.join(projectsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const projectData = JSON.parse(fileContent);
                
                // Only include necessary fields for the list
                projects.push({
                    id: projectData.id,
                    name: projectData.name,
                    tagline: projectData.tagline
                });
            } catch (err) {
                console.warn(`Failed to read project file ${file}:`, err);
            }
        }

        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Error reading projects:', error);
        return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
    }
}
