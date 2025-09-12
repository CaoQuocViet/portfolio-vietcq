'use client'
import { useState, useEffect } from 'react'

const AdminAuth = ({ onAuthSuccess }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSetup, setIsSetup] = useState(false)
    const [needsSetup, setNeedsSetup] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
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

    if (loading && !error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isSetup ? 'Setup Admin' : 'Admin Login'}
                    </h1>
                    <p className="text-gray-400">
                        {isSetup 
                            ? 'Create your admin password to manage blog posts' 
                            : 'Enter your admin password to access the dashboard'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            {isSetup ? 'Create Password' : 'Password'}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                    </div>

                    {isSetup && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Confirm password"
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
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
