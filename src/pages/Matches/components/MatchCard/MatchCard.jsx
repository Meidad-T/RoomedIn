import { useState } from 'react'
import './MatchCard.css'

const MatchCard = ({ match, onSendRequest, onSkip, onReject }) => {
  const [imageError, setImageError] = useState(false)

  // Generate random profile image (same logic as header)
  const getRandomProfileImage = () => {
    if (!match?.id) return '/images/profiles/profile_random_1.png'

    // Use match ID to consistently get same random image for same user
    const hash = match.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    const imageNumber = Math.abs(hash % 6) + 1
    return `/images/profiles/profile_random_${imageNumber}.png`
  }

  // Calculate age from birthday
  const calculateAge = (birthday) => {
    if (!birthday) return null
    const today = new Date()
    const birth = new Date(birthday)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  const age = calculateAge(match.birthday)

  // Format arrays for display
  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 'Not specified'
    return arr.join(', ')
  }

  return (
    <div className="match-card-wrapper">
      {/* Left Action Button */}
      <button 
        onClick={onReject}
        className="side-action-btn left-action-btn reject-btn"
        title="Not interested"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Main Card */}
      <div className="match-card">
        {/* Left Side - Profile */}
        <div className="match-left-side">
          {/* Profile Image */}
          <div className="match-image-container">
            <img
              src={getRandomProfileImage()}
              alt={`${match.firstName} ${match.lastName}`}
              className="match-image"
              onError={() => setImageError(true)}
            />
            <div className="match-status-indicator"></div>
          </div>

          {/* Basic Info */}
          <div className="match-basic-info">
            <h2 className="match-name">{match.firstName} {match.lastName}</h2>
            {age && <p className="match-age">{age} years old</p>}
            <p className="match-bio">{match.bio || "Looking for a roommate that shares my passions!"}</p>
          </div>

          {/* Skip Button (Center) */}
          <div className="center-action">
            <button 
              onClick={onSkip}
              className="action-btn skip-btn"
              title="Skip for now"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Skip for now
            </button>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="match-right-side">
          {/* Academic Info */}
          <div className="match-section">
            <h3 className="section-title">Academic</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Major:</span>
                <span className="info-value">{match.major || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Graduation:</span>
                <span className="info-value">Class of {match.graduationYear || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="match-section">
            <h3 className="section-title">Personal</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Gender:</span>
                <span className="info-value">{match.gender || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sexuality:</span>
                <span className="info-value">{match.sexuality || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Religion:</span>
                <span className="info-value">{match.religion || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="match-section">
            <h3 className="section-title">Lifestyle</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Smoking:</span>
                <span className="info-value">{match.smoking || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Drinking:</span>
                <span className="info-value">{match.drinking || 'Not specified'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Sleep Schedule:</span>
                <span className="info-value">{match.sleepSchedule || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="match-section">
            <h3 className="section-title">Interests</h3>
            <div className="info-grid">
              <div className="info-item full-width">
                <span className="info-label">Hobbies:</span>
                <span className="info-value">{formatArray(match.hobbies)}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Interests:</span>
                <span className="info-value">{formatArray(match.interests)}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Pets:</span>
                <span className="info-value">{formatArray(match.pets)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Action Button */}
      <button 
        onClick={onSendRequest}
        className="side-action-btn right-action-btn match-btn"
        title="Send chat request"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default MatchCard
