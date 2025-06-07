import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Generate random profile image based on user ID
  const getRandomProfileImage = () => {
    if (!user?.uid) return '/images/profiles/profile_random_1.png'

    // Use user ID to consistently get same random image for same user
    const hash = user.uid.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    const imageNumber = Math.abs(hash % 6) + 1
    return `/images/profiles/profile_random_${imageNumber}.png`
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <img
                src="/src/assets/images/Nav_bar_logo.png"
                alt="RoomedIn Logo"
                className="logo-image"
                onError={(e) => {
                  // Fallback to SVG if image not found
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'none' }}
                className="logo-fallback"
              >
                <circle cx="20" cy="20" r="18" fill="var(--primary-green)" stroke="var(--primary-green-dark)" strokeWidth="2"/>
                <path d="M12 16h16v12H12V16z" fill="white" stroke="var(--primary-green-dark)" strokeWidth="1.5"/>
                <path d="M16 12v4M24 12v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="20" r="1.5" fill="var(--primary-green-dark)"/>
                <circle cx="22" cy="20" r="1.5" fill="var(--primary-green-dark)"/>
                <path d="M16 24h8" stroke="var(--primary-green-dark)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/faq" className="nav-link">
              <div className="nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 14v-4M10 6h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              FAQ
            </Link>
            {user ? (
              <div className="user-profile">
                <img
                  src={getRandomProfileImage()}
                  alt={user.displayName}
                  className="user-avatar"
                />
                <div className="user-info">
                  <span className="user-name">{user.displayName}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/signin" className="nav-link">
                <div className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 18c0-4 2.5-6 6-6s6 2 6 6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
