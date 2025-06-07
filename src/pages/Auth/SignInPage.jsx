import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './SignInPage.css'

const SignInPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signInWithGoogle, user, isNewUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    // If user is already signed in, redirect appropriately
    if (user) {
      if (isNewUser) {
        navigate('/onboarding')
      } else {
        navigate(from, { replace: true })
      }
    }
  }, [user, isNewUser, navigate, from])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      
      await signInWithGoogle()
      
      // Navigation will be handled by useEffect above
    } catch (error) {
      console.error('Sign in error:', error)
      setError('Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-content">
          {/* Header */}
          <div className="signin-header">
            <h1 className="signin-title">Welcome to RoomedIn!</h1>
            <p className="signin-subtitle">
              Sign in to find your perfect roommate and start your housing journey
            </p>
          </div>

          {/* Sign in form */}
          <div className="signin-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="google-signin-btn"
            >
              <div className="google-btn-content">
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? 'Signing in...' : 'Continue with Google'}
              </div>
            </button>

            <div className="signin-divider">
              <span>Secure authentication powered by Google</span>
            </div>
          </div>

          {/* Features */}
          <div className="signin-features">
            <div className="feature-item">
              <div className="feature-icon">🏠</div>
              <span>Find compatible roommates</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <span>Connect with students</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <span>Safe & secure platform</span>
            </div>
          </div>

          {/* Footer */}
          <div className="signin-footer">
            <p>
              By signing in, you agree to our{' '}
              <a href="/terms" className="signin-link">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="signin-link">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="signin-decoration">
          <div className="decoration-blob blob-1"></div>
          <div className="decoration-blob blob-2"></div>
          <div className="decoration-blob blob-3"></div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
