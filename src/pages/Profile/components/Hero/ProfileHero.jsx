import { useAuth } from '../../../../contexts/AuthContext'
import './ProfileHero.css'

const ProfileHero = ({ userProfile, isVisible }) => {
  const { user } = useAuth()

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

  const calculateAge = (birthday) => {
    if (!birthday) return null
    
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const age = calculateAge(userProfile.birthday)

  return (
    <section className="profile-hero">
      <div className="profile-hero-background">
        {/* Animated background blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="profile-hero-overlay">
        <div className="container">
          <div className="profile-hero-content">
            <div className={`profile-hero-card ${isVisible ? 'animate-in' : ''}`}>
              <div className="profile-avatar-container">
                <img
                  src={getRandomProfileImage()}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className="profile-avatar-large"
                />
                <div className="profile-status-indicator"></div>
              </div>
              
              <div className="profile-basic-info">
                <h1 className="profile-name">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <div className="profile-details">
                  <span className="profile-university">{userProfile.university}</span>
                  {age && <span className="profile-age">{age} years old</span>}
                </div>
                <div className="profile-academic">
                  <span className="profile-major">{userProfile.major}</span>
                  {userProfile.minor && <span className="profile-minor">Minor: {userProfile.minor}</span>}
                  <span className="profile-graduation">Class of {userProfile.graduationYear}</span>
                </div>
              </div>
            </div>
            
            <div className={`profile-hero-text ${isVisible ? 'animate-in' : ''}`}>
              <h2 className="profile-hero-title">
                <span className="profile-hero-welcome">Your</span>
                <span className="profile-hero-brand">Profile</span>
              </h2>
              <p className="profile-hero-subtitle">
                Here's everything about you that helps us find your perfect roommate! 
                <br />
                🐵 Your answers help create the best matches!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileHero
