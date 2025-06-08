import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthModal.css'

const AuthModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleSignIn = () => {
    onClose()
    navigate('/signin')
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className={`auth-modal-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`auth-modal ${isVisible ? 'visible' : ''}`}>
        <div className="auth-modal-content">
          {/* Header */}
          <div className="auth-modal-header">
            <h2 className="auth-modal-title">Sign In Required</h2>
            <button
              onClick={onClose}
              className="auth-modal-close"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="auth-modal-body">
            <div className="auth-modal-icon">
              🔒
            </div>
            <p className="auth-modal-message">
              You need to sign in to search for universities and find roommates.
            </p>
            
            <div className="auth-modal-features">
              <div className="auth-feature-item">
                <span className="auth-feature-icon">🎓</span>
                <span>Search thousands of universities</span>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">🤝</span>
                <span>Find compatible roommates</span>
              </div>
              <div className="auth-feature-item">
                <span className="auth-feature-icon">💬</span>
                <span>Connect and chat safely</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="auth-modal-actions">
            <button
              onClick={onClose}
              className="auth-btn auth-btn-secondary"
            >
              Maybe Later
            </button>
            <button
              onClick={handleSignIn}
              className="auth-btn auth-btn-primary"
            >
              Sign In Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
