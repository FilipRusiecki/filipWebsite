import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'src/auth'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const AdminLoginPage = () => {
  const { logIn, isAuthenticated, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const hasNavigated = useRef(false)

  // Reset navigation flag when component mounts or auth state changes
  useEffect(() => {
    if (!isAuthenticated) {
      hasNavigated.current = false
    }
  }, [isAuthenticated])

  // Redirect if already logged in (using useEffect to avoid render-time navigation)
  useEffect(() => {
    // Only redirect once when auth is loaded and user is authenticated
    if (!authLoading && isAuthenticated && !hasNavigated.current) {
      hasNavigated.current = true
      // Use a small delay to ensure state is fully updated
      const timeoutId = setTimeout(() => {
        navigate(routes.adminDashboard())
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [isAuthenticated, authLoading])

  // Show loading state while checking auth (but with a timeout to prevent infinite loading)
  if (authLoading) {
    return (
      <div className="dark bg-game-dark min-h-screen flex items-center justify-center">
        <div className="text-game-light">Loading...</div>
      </div>
    )
  }

  // Don't render login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="dark bg-game-dark min-h-screen flex items-center justify-center">
        <div className="text-game-light">Redirecting...</div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (!password || password.length < 1) {
      setError('Please enter your password')
      setLoading(false)
      return
    }

    try {
      // logIn will throw an error if login fails
      await logIn({ username: email.trim(), password })
      // If we get here, login was successful
      // The useEffect will handle navigation when isAuthenticated becomes true
      setLoading(false)
      // Reset navigation flag so useEffect can handle redirect
      hasNavigated.current = false
    } catch (err) {
      // Login failed - show error message
      const errorMessage = err.message || 'Invalid email or password'
      setError(errorMessage)
      setLoading(false)
      console.error('Login failed:', err)
    }
  }

  return (
    <>
      <Metadata title="Admin Login - FRVideoGames" />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-game-light">
                Admin Login
              </h1>
              <p className="text-game-light/60 text-center mb-8">
                Sign in to manage support tickets and bug reports
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-game-light font-semibold mb-2">
                    Email <span className="text-game-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
                    placeholder="admin@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-game-light font-semibold mb-2">
                    Password <span className="text-game-accent">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-game-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AdminLoginPage
