'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

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
            <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900/50">
                <div className="text-gray-900 dark:text-white text-center relative z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-200 dark:bg-gray-900/50">
            <div className={`max-w-md w-full rounded-2xl shadow-lg p-8 relative z-10 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
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
                            className={`w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                theme === 'dark'
                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                    : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                            }`}
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
                                className={`w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                theme === 'dark'
                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                    : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                            }`}
                                placeholder="Confirm password"
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {error && (
                        <div className={`px-4 py-3 rounded-lg ${
                            theme === 'dark'
                                ? 'bg-red-900 text-red-200'
                                : 'bg-red-50 text-red-700'
                        }`}>
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
