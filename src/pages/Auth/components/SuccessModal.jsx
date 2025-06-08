import { useEffect, useState } from 'react'
import partyMonkeyImg from '../../../assets/images/auth/user_created_party_monkey.png'
import './SuccessModal.css'

const SuccessModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <div 
      className={`success-modal-overlay ${isVisible ? 'visible' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`success-modal ${isVisible ? 'visible' : ''}`}>
        <div className="success-content">
          {/* Celebration Animation */}
          <div className="celebration-container">
            <div className="confetti">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`confetti-piece confetti-${i % 4}`}></div>
              ))}
            </div>
            
            <div className="party-monkey-container">
              <img
                src={partyMonkeyImg}
                alt="Celebration Monkey"
                className="party-monkey"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <div className="monkey-fallback" style={{ display: 'none' }}>
                🎉🐵🎉
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="success-message">
            <h1 className="success-title">
              Welcome to RoomedIn! 🎉
            </h1>
            <p className="success-subtitle">
              Your profile has been created successfully! You're now ready to find your perfect roommate.
            </p>
            
            <div className="success-features">
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <span>Search for universities</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <span>Find compatible roommates</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <span>Connect and chat</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="success-actions">
            <button
              onClick={handleClose}
              className="begin-btn"
            >
              Let's Begin! 🚀
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="close-btn"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
