import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../../services/firebase'
import howItWorksImage from '../../../FAQ/assets/images/how_it_works.png'
import './RetakeQuizSection.css'

const RetakeQuizSection = () => {
  const { user, clearUserProfile } = useAuth()
  const navigate = useNavigate()
  const [isRetaking, setIsRetaking] = useState(false)

  const handleRetakeQuiz = async () => {
    if (!window.confirm('Are you sure you want to retake the quiz? This will delete all your current profile data and you\'ll need to complete the entire quiz again.')) {
      return
    }

    try {
      setIsRetaking(true)

      // Delete user document from Firebase
      await deleteDoc(doc(db, 'users', user.uid))
      console.log('User profile deleted successfully')

      // Clear local user profile state immediately
      clearUserProfile()

      // Small delay to ensure state updates, then navigate
      setTimeout(() => {
        navigate('/onboarding', { replace: true })
      }, 100)

    } catch (error) {
      console.error('Error deleting user profile:', error)
      alert('Failed to delete profile. Please try again.')
      setIsRetaking(false)
    }
  }

  return (
    <section className="retake-quiz-section">
      <div className="container">
        <div className="retake-quiz-content">
          <div className="retake-quiz-image">
            <img 
              src={howItWorksImage} 
              alt="How it works" 
              className="retake-quiz-img"
            />
          </div>
          
          <div className="retake-quiz-text">
            <h3 className="retake-quiz-title">
              Something seems wrong?
            </h3>
            <p className="retake-quiz-description">
              Need to update your info? Take the quiz again and update your profile with fresh answers!
            </p>
            <button 
              onClick={handleRetakeQuiz}
              disabled={isRetaking}
              className="retake-quiz-btn"
            >
              {isRetaking ? 'Deleting Profile...' : 'Retake Quiz'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RetakeQuizSection
