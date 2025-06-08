import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import './ProfileHeader.css'

const ProfileHeader = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="profile-header">
      <div className="container">
        <div className="profile-header-content">
          {/* Logo */}
          <div className="profile-logo" onClick={handleHomeClick}>
            <div className="profile-logo-icon">
              <img
                src="/src/assets/images/Nav_bar_logo.png"
                alt="RoomedIn Logo"
                className="profile-logo-image"
                onError={(e) => {
                  // Fallback to SVG if image not found
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <svg 
                className="profile-logo-fallback" 
                width="40" 
                height="40" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="12" fill="var(--primary-green)"/>
                <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="white"/>
              </svg>
            </div>
            <span className="profile-logo-text">RoomedIn</span>
          </div>

          {/* Navigation */}
          <nav className="profile-nav">
            <button onClick={handleHomeClick} className="profile-nav-link">
              <div className="profile-nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10l7-7 7 7M5 8v8a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h2a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Home
            </button>
            <button onClick={handleLogout} className="profile-nav-link logout">
              <div className="profile-nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 3h4a2 2 0 012 2v10a2 2 0 01-2 2h-4M8 17l4-4-4-4M12 10H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Sign out
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
