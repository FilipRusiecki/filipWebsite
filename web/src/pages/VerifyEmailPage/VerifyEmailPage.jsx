import { useEffect, useState } from 'react'
import { useLocation, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const VerifyEmailPage = () => {
  const location = useLocation()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      // Get token from query string
      const params = new URLSearchParams(location.search)
      const token = params.get('token')

      if (!token) {
        setStatus('error')
        setMessage('No verification token provided.')
        return
      }

      try {
        // Call the verify email API endpoint
        // RedwoodJS automatically handles the API path based on redwood.toml apiUrl setting
        const apiPath = window.location.hostname === 'localhost' ? '/.redwood/functions' : '/api'
        const response = await fetch(`${apiPath}/verifyEmail?token=${encodeURIComponent(token)}`)
        const data = await response.json()

        if (response.ok && data.success) {
          setStatus('success')
          setMessage('Email verified successfully! You can now log in.')
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate(routes.adminLogin())
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.error || data.message || 'Failed to verify email. The token may be invalid or expired.')
        }
      } catch (error) {
        console.error('Email verification error:', error)
        setStatus('error')
        setMessage('An error occurred while verifying your email. Please try again later.')
      }
    }

    verifyEmail()
  }, [location.search])

  return (
    <>
      <Metadata title="Verify Email - FRVideoGames" />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-8 text-center">
              {status === 'verifying' && (
                <>
                  <div className="text-6xl mb-6">⏳</div>
                  <h1 className="text-3xl font-bold text-game-light mb-4">Verifying Email...</h1>
                  <p className="text-game-light/80">Please wait while we verify your email address.</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="text-6xl mb-6">✅</div>
                  <h1 className="text-3xl font-bold text-game-light mb-4">Email Verified!</h1>
                  <p className="text-game-light/80 mb-6">{message}</p>
                  <p className="text-game-light/60 text-sm">Redirecting to login page...</p>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="text-6xl mb-6">❌</div>
                  <h1 className="text-3xl font-bold text-game-light mb-4">Verification Failed</h1>
                  <p className="text-game-light/80 mb-6">{message}</p>
                  <button
                    onClick={() => navigate(routes.adminLogin())}
                    className="bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
                  >
                    Go to Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default VerifyEmailPage
