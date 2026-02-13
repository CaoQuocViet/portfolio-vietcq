import { redirect } from 'next/navigation'

const ADMIN_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090'

export default function AdminPage() {
    redirect(`${ADMIN_URL}/_/`)
}
