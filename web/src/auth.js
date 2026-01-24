import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { createDbAuthClient } from '@redwoodjs/auth-dbauth-web'

// Create the dbAuth client
const dbAuthClient = createDbAuthClient({
  fetchConfig: {
    credentials: 'include',
  },
})

// Create Auth Context
const AuthContext = createContext({
  isAuthenticated: false,
  currentUser: null,
  loading: true,
  logIn: async () => {},
  logOut: async () => {},
  hasRole: () => false,
})

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check authentication status on mount (only once)
  useEffect(() => {
    let isMounted = true
    let timeoutId = null

    const checkAuth = async () => {
      if (!isMounted) return

      try {
        // Try to get current user metadata with retry logic
        let retries = 3
        let userMetadata = null

        while (retries > 0 && isMounted) {
          try {
            userMetadata = await dbAuthClient.getUserMetadata()
            break // Success, exit retry loop
          } catch (error) {
            // If API is not ready or returns 500, retry after a delay
            if (error.message?.includes('ECONNREFUSED') ||
                error.message?.includes('not available') ||
                error.message?.includes('reloading') ||
                error.message?.includes('500') ||
                error.message?.includes('Failed to execute')) {
              retries--
              if (retries > 0 && isMounted) {
                await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
                continue
              }
            }
            // Other errors (like 401/403) mean not authenticated - don't retry
            break
          }
        }

        if (!isMounted) return

        if (userMetadata) {
          setIsAuthenticated(true)
          setCurrentUser(userMetadata)
        } else {
          setIsAuthenticated(false)
          setCurrentUser(null)
        }
      } catch (error) {
        // Not authenticated or API not ready - silently fail
        // Don't log errors here as they're expected when not logged in
        if (isMounted) {
          setIsAuthenticated(false)
          setCurrentUser(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Wait a bit before checking auth to let API server start
    timeoutId = setTimeout(() => {
      checkAuth()
    }, 2000) // Wait 2 seconds for API to be ready

    // Also set a maximum timeout - if auth check takes too long, stop loading
    const maxTimeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false)
        setIsAuthenticated(false)
        setCurrentUser(null)
      }
    }, 10000) // 10 seconds max

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId)
      }
    }
  }, [])

  const logIn = async (credentials) => {
    try {
      const response = await dbAuthClient.login(credentials)

      // After login, get user metadata
      // getUserMetadata should return the user data including role (from login handler)
      let userMetadata = null
      try {
        // Add a small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100))
        userMetadata = await dbAuthClient.getUserMetadata()
      } catch (err) {
        console.warn('getUserMetadata failed, using login response:', err)
      }

      // The login handler returns { id, email, role }
      // getUserMetadata might return the same or we use the login response
      const userData = userMetadata || response?.user || response

      if (userData) {
        // Update state in a single batch to avoid race conditions
        setCurrentUser({
          id: userData.id,
          email: userData.email || credentials.username,
          role: userData.role || 'admin', // Default to admin if not provided
        })
        setIsAuthenticated(true)
      } else {
        // Fallback: just mark as authenticated
        setCurrentUser({ id: response?.id, email: credentials.username, role: 'admin' })
        setIsAuthenticated(true)
      }

      return response
    } catch (error) {
      console.error('Login error:', error)
      // Extract error message from response if available
      const errorMessage = error.message || error.error || 'Invalid email or password'
      throw new Error(errorMessage)
    }
  }

  const logOut = async () => {
    try {
      await dbAuthClient.logout()
      setIsAuthenticated(false)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local state
      setIsAuthenticated(false)
      setCurrentUser(null)
    }
  }

  // Memoize hasRole to prevent it from being recreated on every render
  const hasRole = useCallback((role) => {
    if (!currentUser) return false
    const userRole = currentUser.role
    if (typeof role === 'string') {
      return userRole === role
    }
    if (Array.isArray(role)) {
      return role.includes(userRole)
    }
    return false
  }, [currentUser])

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isAuthenticated,
    currentUser,
    loading,
    logIn,
    logOut,
    hasRole,
  }), [isAuthenticated, currentUser, loading, hasRole])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
