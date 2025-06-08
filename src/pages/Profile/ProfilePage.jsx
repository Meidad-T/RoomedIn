import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ProfileHeader from './components/Header/ProfileHeader'
import ProfileHero from './components/Hero/ProfileHero'
import ProfileContent from './components/ProfileContent/ProfileContent'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user, userProfile, loading } = useAuth()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate('/signin')
      return
    }

    // Redirect if profile not complete
    if (!loading && user && !userProfile?.profileComplete) {
      navigate('/onboarding')
      return
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Set page title
    document.title = `${userProfile?.firstName || 'My'} Profile - RoomedIn`
    
    // Trigger animations
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      clearTimeout(timer)
    }
  }, [user, userProfile, loading, navigate])

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    )
  }

  if (!user || !userProfile) {
    return null
  }

  return (
    <div className="profile-page">
      <ProfileHeader />
      <main className="profile-main">
        <ProfileHero userProfile={userProfile} isVisible={isVisible} />
        <ProfileContent userProfile={userProfile} isVisible={isVisible} />
      </main>
    </div>
  )
}

export default ProfilePage
