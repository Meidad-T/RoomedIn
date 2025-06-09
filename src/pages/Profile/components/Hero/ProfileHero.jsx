import { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import './ProfileHero.css'

const ProfileHero = ({ userProfile, isVisible }) => {
  const { user, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(`${userProfile.firstName} ${userProfile.lastName}`)
  const [editedBio, setEditedBio] = useState(userProfile.bio || "Looking for a roommate that shares my passions!")
  const [isSaving, setIsSaving] = useState(false)

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

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // Split the edited name into first and last name
      const nameParts = editedName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      await updateUserProfile({
        firstName,
        lastName,
        bio: editedBio.trim()
      })

      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedName(`${userProfile.firstName} ${userProfile.lastName}`)
    setEditedBio(userProfile.bio || "Looking for a roommate that shares my passions!")
    setIsEditing(false)
  }



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
              {/* Edit button - positioned absolutely */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="profile-edit-btn-absolute"
                  title="Edit name and bio"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}

              <div className="profile-avatar-container">
                <img
                  src={getRandomProfileImage()}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                  className="profile-avatar-large"
                />
                <div className="profile-status-indicator"></div>
              </div>

              <div className="profile-basic-info">
                {isEditing ? (
                  <div className="profile-edit-form">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="profile-name-input"
                      placeholder="Your name"
                      maxLength={50}
                    />
                    <textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      className="profile-bio-input"
                      placeholder="Looking for a roommate that shares my passions!"
                      maxLength={45}
                      rows={2}
                    />
                    <div className="profile-edit-actions">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="profile-save-btn"
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="profile-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="profile-name">
                      {userProfile.firstName} {userProfile.lastName}
                    </h1>
                    <div className="profile-bio-green">
                      {userProfile.bio || "Looking for a roommate that shares my passions!"}
                    </div>
                    <div className="profile-graduation">Class of {userProfile.graduationYear}</div>
                    <div className="profile-academic">
                      <span className="profile-major">Major: {userProfile.major}</span>
                      {userProfile.minor && <span className="profile-minor">Minor: {userProfile.minor}</span>}
                    </div>
                    <div className="profile-details">
                      {age && <span className="profile-age">{age} years old</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className={`profile-hero-text ${isVisible ? 'animate-in' : ''}`}>
              <h2 className="profile-hero-title">
                <span className="profile-hero-welcome">Your</span>
                <span className="profile-hero-brand">Profile</span>
              </h2>
              <p className="profile-hero-subtitle">
                Your profile is based on your answers when you signed up. This is what others see when they match with you!
              </p>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileHero
