import { useState } from 'react'
import './MatchCard.css'

const MatchCard = ({ match, onSendRequest, onSkip, onReject }) => {
  const [imageError, setImageError] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  // Generate random solid color for profile background
  const getRandomColor = () => {
    if (!match?.id) return '#3498db'

    const colors = [
      '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
      '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
    ]

    const hash = match.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    return colors[Math.abs(hash % colors.length)]
  }

  // Get emoji for field
  const getEmojiForField = (field, value) => {
    const emojiMap = {
      gender: { male: '👨', female: '👩', 'non-binary': '🧑', other: '👤' },
      major: '🎓',
      smoking: { never: '🚭', occasionally: '🚬', regularly: '🚬', socially: '🚬' },
      drinking: { never: '🚫', occasionally: '🍷', regularly: '🍺', socially: '🥂' },
      pets: { none: '🚫', cats: '🐱', dogs: '🐶', both: '🐾', other: '🐹' },
      cleanliness: { 'very-clean': '✨', clean: '🧹', average: '🏠', messy: '🌪️' },
      studyHabits: { 'very-quiet': '🤫', quiet: '📚', moderate: '🎧', social: '👥' },
      socialLevel: { introvert: '🏠', ambivert: '⚖️', extrovert: '🎉' },
      sleepSchedule: { 'early-bird': '🌅', normal: '😴', 'night-owl': '🦉', irregular: '🔄' },
      sexuality: { straight: '💙', gay: '🏳️‍🌈', lesbian: '🏳️‍🌈', bisexual: '💜', other: '❤️' },
      religion: { christian: '✝️', muslim: '☪️', jewish: '✡️', hindu: '🕉️', buddhist: '☸️', other: '🙏', none: '🌟' }
    }

    if (field === 'major') return '🎓'
    return emojiMap[field]?.[value] || '📝'
  }

  return (
    <div className="match-card-wrapper">
      {/* Left Action Button */}
      <button
        onClick={onReject}
        className="side-action-btn left-action-btn reject-btn"
        title="Not interested"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Simple Card */}
      <div className="match-card">
        {/* Profile Header */}
        <div className="match-header" style={{ backgroundColor: getRandomColor() }}>
          <img
            src={getRandomProfileImage()}
            alt={`${match.firstName} ${match.lastName}`}
            className="match-avatar"
            onError={() => setImageError(true)}
          />
          <h2 className="match-name">{match.firstName} {match.lastName}</h2>
        </div>

        {/* Basic Info */}
        <div className="match-body">
          <div className="basic-info">
            <div className="info-item">
              <span className="info-icon">🎂</span>
              <span className="info-text">{age || 'N/A'} years old</span>
            </div>
            <div className="info-item">
              <span className="info-icon">{getEmojiForField('gender', match.gender)}</span>
              <span className="info-text">{match.gender || 'Not specified'}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🎓</span>
              <span className="info-text">{match.major || 'Not specified'}</span>
            </div>
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="expanded-details">
              <div className="detail-row">
                <span className="detail-label">Sexuality:</span>
                <span className="detail-value">{match.sexuality || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Religion:</span>
                <span className="detail-value">{match.religion || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Smoking:</span>
                <span className="detail-value">{match.smoking || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Drinking:</span>
                <span className="detail-value">{match.drinking || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pets:</span>
                <span className="detail-value">{formatArray(match.pets)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sleep Schedule:</span>
                <span className="detail-value">{match.sleepSchedule || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cleanliness:</span>
                <span className="detail-value">{match.cleanliness || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Study Habits:</span>
                <span className="detail-value">{match.studyHabits || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Social Level:</span>
                <span className="detail-value">{match.socialLevel || 'Not specified'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hobbies:</span>
                <span className="detail-value">{formatArray(match.hobbies)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Interests:</span>
                <span className="detail-value">{formatArray(match.interests)}</span>
              </div>
              {match.bio && (
                <div className="detail-row bio-row">
                  <span className="detail-label">About:</span>
                  <span className="detail-value">{match.bio}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="match-actions">
            <button
              onClick={onSkip}
              className="action-btn skip-btn"
            >
              Skip
            </button>

            <button
              className="action-btn expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>



      {/* Right Action Button */}
      <button
        onClick={onSendRequest}
        className="side-action-btn right-action-btn match-btn"
        title="Send chat request"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default MatchCard
