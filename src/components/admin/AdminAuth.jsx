'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import GridBackground from '../ui/GridBackground'

const AdminAuth = ({ onAuthSuccess }) => {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSetup, setIsSetup] = useState(false)
    const [needsSetup, setNeedsSetup] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setMounted(true)
        checkAdminSetup()
    }, [])

    const checkAdminSetup = async () => {
        try {
            const response = await fetch('/api/admin/auth')
            const data = await response.json()
            setNeedsSetup(data.needsSetup)
            setIsSetup(data.needsSetup)
        } catch (error) {
            console.error('Error checking admin setup:', error)
            setNeedsSetup(true)
            setIsSetup(true)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (isSetup && password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try {
            const action = isSetup ? 'setup' : 'login'
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, action }),
            })

            const data = await response.json()

            if (data.success) {
                // Store auth state in sessionStorage
                sessionStorage.setItem('adminAuth', 'true')
                onAuthSuccess()
            } else {
                if (data.needsSetup) {
                    setNeedsSetup(true)
                    setIsSetup(true)
                }
                setError(data.message || 'Authentication failed')
            }
        } catch (error) {
            console.error('Auth error:', error)
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!mounted) return null

    if (loading && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <GridBackground theme={theme} />
                <div className="text-gray-900 dark:text-white text-center relative z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
            <GridBackground theme={theme} />
            <div className="max-w-md w-full backdrop-filter backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {isSetup ? 'Setup Admin' : 'Admin Login'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isSetup 
                            ? 'Create your admin password to manage blog posts' 
                            : 'Enter your admin password to access the dashboard'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {isSetup ? 'Create Password' : 'Password'}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                    </div>

                    {isSetup && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Confirm password"
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/50 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        {loading ? 'Please wait...' : (isSetup ? 'Setup Admin' : 'Login')}
                    </button>
                </form>

                {!isSetup && needsSetup && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 mb-3">Need to setup admin?</p>
                        <button
                            onClick={() => setIsSetup(true)}
                            className="text-indigo-400 hover:text-indigo-300 font-medium"
                        >
                            Setup New Admin
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminAuth
