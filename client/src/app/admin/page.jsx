import { redirect } from 'next/navigation'

const PB_ADMIN_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090'

export default function AdminPage() {
    redirect(`${PB_ADMIN_URL}/_/`)
}
