import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Header from '../../components/Header/Header'
import MatchCard from './components/MatchCard/MatchCard'
import NoMoreMatches from './components/NoMoreMatches/NoMoreMatches'
import { getUniversityMatches } from '../../services/MatchingService.js'
import './MatchesPage.css'

const MatchesPage = () => {
  const { universityId } = useParams()
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()
  
  const [matches, setMatches] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Redirect if not authenticated or profile incomplete
  useEffect(() => {
    if (!user) {
      navigate('/signin')
      return
    }
    
    if (!userProfile?.profileComplete) {
      navigate('/onboarding')
      return
    }
  }, [user, userProfile, navigate])

  // Load matches for the university
  useEffect(() => {
    const loadMatches = async () => {
      if (!universityId || !user) return
      
      try {
        setLoading(true)
        setError(null)
        
        console.log('Loading matches for university:', universityId)
        const universityMatches = await getUniversityMatches(universityId, user.uid)
        
        setMatches(universityMatches)
        setCurrentIndex(0)
        
        console.log(`Found ${universityMatches.length} potential matches`)
      } catch (err) {
        console.error('Error loading matches:', err)
        setError('Failed to load potential matches. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [universityId, user])

  // Handle match actions
  const handleSendRequest = () => {
    // TODO: Implement actual matching logic later
    // For now, just show toast and move to next
    showToast('Match request sent to potential roommate!')
    moveToNext()
  }

  const handleSkip = () => {
    moveToNext()
  }

  const handleReject = () => {
    // TODO: Store rejection in database later
    moveToNext()
  }

  const moveToNext = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // No more matches - show empty state
      setCurrentIndex(matches.length)
    }
  }

  const showToast = (message) => {
    // Simple toast implementation
    const toast = document.createElement('div')
    toast.className = 'toast-message'
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.classList.add('show')
    }, 100)
    
    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  // Loading state
  if (loading) {
    return (
      <div className="matches-page">
        <Header />
        <div className="matches-content">
          <div className="matches-header">
            <h1 className="matches-title">
              Finding potential roommates...
            </h1>
          </div>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Searching for students at your university...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="matches-page">
        <Header />
        <div className="matches-content">
          <div className="matches-header">
            <h1 className="matches-title">
              Oops! Something went wrong
            </h1>
          </div>
          <div className="error-state">
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="back-home-btn">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No more matches state
  if (matches.length === 0 || currentIndex >= matches.length) {
    return (
      <div className="matches-page">
        <Header />
        <div className="matches-content">
          <NoMoreMatches universityName={matches[0]?.universityName || 'this university'} />
        </div>
      </div>
    )
  }

  const currentMatch = matches[currentIndex]

  return (
    <div className="matches-page">
      <Header />
      <div className="matches-content">
        {/* Page Header */}
        <div className="matches-header">
          <h1 className="matches-title">
            Showing results for: <span className="university-name">{currentMatch.universityName || 'University'}</span>
          </h1>
          <div className="matches-progress">
            <span>{currentIndex + 1} of {matches.length}</span>
          </div>
        </div>

        {/* Match Card */}
        <div className="match-card-container">
          <MatchCard
            match={currentMatch}
            onSendRequest={handleSendRequest}
            onSkip={handleSkip}
            onReject={handleReject}
          />
        </div>
      </div>
    </div>
  )
}

export default MatchesPage
