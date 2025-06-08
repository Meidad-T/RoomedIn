import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requireCompleteProfile = false }) => {
  const { user, userProfile, loading } = useAuth()
  const location = useLocation()

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="loading-spinner">
          <svg className="spinner" viewBox="0 0 24 24" style={{ width: '40px', height: '40px' }}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading...</p>
      </div>
    )
  }

  // Not authenticated - redirect to sign in
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  // Authenticated but profile incomplete - redirect to onboarding
  if (user && (!userProfile?.profileComplete)) {
    if (location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />
    }
  }

  // Authenticated with complete profile but trying to access onboarding
  if (user && userProfile?.profileComplete && location.pathname === '/onboarding') {
    return <Navigate to="/" replace />
  }

  // If requireCompleteProfile is true, check if profile is complete
  if (requireCompleteProfile && !userProfile?.profileComplete) {
    return <Navigate to="/onboarding" replace />
  }

  // All checks passed - render the protected component
  return children
}

export default ProtectedRoute
