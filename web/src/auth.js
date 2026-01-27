import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { createDbAuthClient } from '@redwoodjs/auth-dbauth-web'

// Create the dbAuth client
const dbAuthClient = createDbAuthClient({
  fetchConfig: {
    credentials: 'include',
  },
})

// Fetch full current user (id, email, role) from GraphQL when we only have a session id.
// dbAuth's getUserMetadata() returns just the id; this fills in the rest.
const fetchCurrentUserFromApi = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query { currentUser { id email role } }',
      }),
    })
    const json = await res.json()
    const user = json?.data?.currentUser
    return user && typeof user === 'object' && user.id != null && user.email != null ? user : null
  } catch {
    return null
  }
}

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
          const hasFullUser = typeof userMetadata === 'object' && userMetadata?.id != null && userMetadata?.email != null
          if (hasFullUser) {
            setIsAuthenticated(true)
            setCurrentUser(userMetadata)
          } else {
            // dbAuth getUserMetadata returns only the user id; fetch full user (id, email, role)
            const fullUser = await fetchCurrentUserFromApi()
            if (fullUser) {
              setIsAuthenticated(true)
              setCurrentUser(fullUser)
            } else {
              setIsAuthenticated(false)
              setCurrentUser(null)
            }
          }
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

      // dbAuth web client does NOT throw on 400; getUserMetadata() returns only the user id.
      // On success the login API returns the sanitized user body (id, email, role when allowedUserFields includes them).
      const looksLikeUser = response && typeof response === 'object' && response.id != null && response.email != null

      if (looksLikeUser) {
        const userMetadata = {
          id: response.id,
          email: response.email,
          role: response.role,
        }
        if (!userMetadata.role) {
          console.error('User data missing role:', userMetadata)
          throw new Error('User account is missing role information. Please contact support.')
        }
        setCurrentUser(userMetadata)
        setIsAuthenticated(true)
        return response
      }

      // Login failed (400 with { error: "..." }) or body was not a user object
      const errorMessage = (response && typeof response === 'object' && response.error) || 'Invalid email or password. If this is an admin account, ensure the production database has your user and DATABASE_URL is set correctly on the server.'
      throw new Error(typeof errorMessage === 'string' ? errorMessage : 'Invalid email or password.')
    } catch (error) {
      console.error('Login error:', error)
      // Ensure we're not authenticated on error
      setIsAuthenticated(false)
      setCurrentUser(null)
      // Pass through API error messages (e.g. "Please verify your email", "Invalid email or password")
      const errorMessage = error.message || (typeof error.error === 'string' ? error.error : null) || 'Invalid email or password'
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
