import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import UniversitySearch from '../UniversitySearch/UniversitySearch'
import AuthModal from '../AuthModal'
import './Hero.css'

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, userProfile } = useAuth()

  const handleUniversitySelect = (university) => {
    // Check if user is authenticated and has complete profile
    if (!user) {
      setShowAuthModal(true)
      return
    }

    if (!userProfile?.profileComplete) {
      // User is signed in but hasn't completed onboarding
      // This will be handled by ProtectedRoute
      return
    }

    console.log('Selected university:', university)
    // TODO: Navigate to university page or handle selection
  }

  return (
    <>
      <section className="hero">
        <div className="hero-background">
          {/* City skyline background will be added via CSS */}
        </div>
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="hero-welcome">Welcome to</span> <span className="hero-brand">RoomedIn</span>
              </h1>

              <div className="search-container">
                <UniversitySearch onUniversitySelect={handleUniversitySelect} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

export default Hero
