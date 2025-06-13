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

  // Generate random gradient for profile background
  const getRandomGradient = () => {
    if (!match?.id) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ]

    const hash = match.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    return gradients[Math.abs(hash % gradients.length)]
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

  // Calculate compatibility score (mock calculation)
  const getCompatibilityScore = () => {
    if (!match?.id) return 85
    const hash = match.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash % 20) + 75 // Score between 75-95
  }

  const compatibilityScore = getCompatibilityScore()

  // Get display value for fields (handle custom values)
  const getDisplayValue = (field, value, customValue) => {
    if (value === 'other' && customValue) {
      return customValue
    }

    // Format field values for better display
    const formatMap = {
      'very-clean': 'Very Clean',
      'early-bird': 'Early Bird',
      'night-owl': 'Night Owl',
      'very-quiet': 'Very Quiet',
      'non-binary': 'Non-Binary'
    }

    return formatMap[value] || (value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Not specified')
  }

  return (
    <div className="modern-match-container">
      {/* Left Action Button */}
      <button
        onClick={onReject}
        className="action-circle reject-circle"
        title="Not interested"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Main Card Container */}
      <div className={`modern-match-card ${isExpanded ? 'expanded' : ''}`}>
        {/* Main Card */}
        <div className="main-card">
          {/* Profile Header with Gradient */}
          <div className="profile-header" style={{ background: getRandomGradient() }}>
            <div className="profile-image-container">
              <img
                src={getRandomProfileImage()}
                alt={`${match.firstName} ${match.lastName}`}
                className="profile-image"
                onError={() => setImageError(true)}
              />
              <div className="compatibility-badge">
                <span className="compatibility-score">{compatibilityScore}%</span>
                <span className="compatibility-label">Match</span>
              </div>
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{match.firstName} {match.lastName}</h2>
              <p className="profile-subtitle">{age ? `${age} years old` : 'Age not specified'} • {match.major || 'Major not specified'}</p>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="quick-info-grid">
            <div className="info-card">
              <div className="info-icon">{getEmojiForField('gender', match.gender)}</div>
              <div className="info-content">
                <span className="info-label">Gender</span>
                <span className="info-value">{getDisplayValue('gender', match.gender)}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">🎓</div>
              <div className="info-content">
                <span className="info-label">Graduation</span>
                <span className="info-value">{match.graduationYear || 'Not specified'}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">{getEmojiForField('cleanliness', match.cleanliness)}</div>
              <div className="info-content">
                <span className="info-label">Cleanliness</span>
                <span className="info-value">{getDisplayValue('cleanliness', match.cleanliness)}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">{getEmojiForField('socialLevel', match.socialLevel)}</div>
              <div className="info-content">
                <span className="info-label">Social</span>
                <span className="info-value">{getDisplayValue('socialLevel', match.socialLevel)}</span>
              </div>
            </div>
          </div>

          {/* Bio Preview */}
          {match.bio && (
            <div className="bio-preview">
              <p className="bio-text">"{match.bio.length > 80 ? match.bio.substring(0, 80) + '...' : match.bio}"</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card-actions">
            <button onClick={onSkip} className="action-btn skip-btn">
              <span>Skip</span>
            </button>

            <button
              className="action-btn expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable Details Panel - Slides from Right */}
        <div className={`details-panel ${isExpanded ? 'panel-open' : ''}`}>
          <div className="panel-header">
            <h3 className="panel-title">Detailed Profile</h3>
            <button
              className="panel-close-btn"
              onClick={() => setIsExpanded(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="panel-content">
            {/* Identity Section */}
            <div className="detail-section">
              <h4 className="section-title">
                <span className="section-icon">🆔</span>
                Identity & Background
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('sexuality', match.sexuality)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Sexuality</span>
                    <span className="detail-value">{getDisplayValue('sexuality', match.sexuality, match.customSexuality)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('religion', match.religion)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Religion</span>
                    <span className="detail-value">{getDisplayValue('religion', match.religion, match.customReligion)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="detail-section">
              <h4 className="section-title">
                <span className="section-icon">🌿</span>
                Lifestyle Preferences
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('smoking', match.smoking)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Smoking</span>
                    <span className="detail-value">{getDisplayValue('smoking', match.smoking)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('drinking', match.drinking)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Drinking</span>
                    <span className="detail-value">{getDisplayValue('drinking', match.drinking)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('pets', match.pets)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Pets</span>
                    <span className="detail-value">{getDisplayValue('pets', match.pets, match.customPets)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Living Habits Section */}
            <div className="detail-section">
              <h4 className="section-title">
                <span className="section-icon">🏠</span>
                Living Habits
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('studyHabits', match.studyHabits)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Study Habits</span>
                    <span className="detail-value">{getDisplayValue('studyHabits', match.studyHabits)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-emoji">{getEmojiForField('sleepSchedule', match.sleepSchedule)}</span>
                  <div className="detail-text">
                    <span className="detail-label">Sleep Schedule</span>
                    <span className="detail-value">{getDisplayValue('sleepSchedule', match.sleepSchedule)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Section */}
            {(match.interests?.length > 0 || match.hobbies?.length > 0) && (
              <div className="detail-section">
                <h4 className="section-title">
                  <span className="section-icon">🎯</span>
                  Interests & Hobbies
                </h4>
                {match.interests?.length > 0 && (
                  <div className="interests-container">
                    <span className="interests-label">Interests:</span>
                    <div className="interests-tags">
                      {match.interests.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                )}
                {match.hobbies?.length > 0 && (
                  <div className="interests-container">
                    <span className="interests-label">Hobbies:</span>
                    <div className="interests-tags">
                      {match.hobbies.map((hobby, index) => (
                        <span key={index} className="interest-tag hobby-tag">{hobby}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Bio Section */}
            {match.bio && (
              <div className="detail-section">
                <h4 className="section-title">
                  <span className="section-icon">💭</span>
                  About Me
                </h4>
                <div className="full-bio">
                  <p className="bio-full-text">{match.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Action Button */}
      <button
        onClick={onSendRequest}
        className="action-circle match-circle"
        title="Send chat request"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default MatchCard
