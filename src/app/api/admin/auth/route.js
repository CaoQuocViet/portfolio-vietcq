import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ADMIN_CONFIG_PATH = path.join(process.cwd(), 'public/data/admin/config.json')

export async function POST(request) {
    try {
        const { password, action } = await request.json()
        
        if (action === 'setup') {
            // Setup new admin password
            const crypto = await import('crypto')
            const hash = crypto.createHash('sha256')
            hash.update(password + 'vietcq-admin-salt')
            const hashedPassword = hash.digest('hex')
            
            const adminConfig = {
                passwordHash: hashedPassword,
                createdAt: new Date().toISOString()
            }
            
            // Ensure admin directory exists
            const adminDir = path.dirname(ADMIN_CONFIG_PATH)
            if (!fs.existsSync(adminDir)) {
                fs.mkdirSync(adminDir, { recursive: true })
            }
            
            fs.writeFileSync(ADMIN_CONFIG_PATH, JSON.stringify(adminConfig, null, 2))
            
            return NextResponse.json({ success: true, message: 'Admin password set successfully' })
        }
        
        if (action === 'login') {
            // Check if admin config exists
            if (!fs.existsSync(ADMIN_CONFIG_PATH)) {
                return NextResponse.json({ success: false, needsSetup: true, message: 'Admin not configured' })
            }
            
            const adminConfig = JSON.parse(fs.readFileSync(ADMIN_CONFIG_PATH, 'utf8'))
            
            // Hash the provided password
            const crypto = await import('crypto')
            const hash = crypto.createHash('sha256')
            hash.update(password + 'vietcq-admin-salt')
            const hashedPassword = hash.digest('hex')
            
            if (hashedPassword === adminConfig.passwordHash) {
                return NextResponse.json({ success: true, message: 'Login successful' })
            } else {
                return NextResponse.json({ success: false, message: 'Invalid password' })
            }
        }
        
        return NextResponse.json({ success: false, message: 'Invalid action' })
        
    } catch (error) {
        console.error('Admin auth error:', error)
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const needsSetup = !fs.existsSync(ADMIN_CONFIG_PATH)
        return NextResponse.json({ needsSetup })
    } catch (error) {
        console.error('Admin check error:', error)
        return NextResponse.json({ needsSetup: true })
    }
}
