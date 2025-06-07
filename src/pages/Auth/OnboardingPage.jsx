import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import OnboardingStep from './components/OnboardingStep'
import SuccessModal from './components/SuccessModal'
import './OnboardingPage.css'

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { user, updateUserProfile } = useAuth()
  const navigate = useNavigate()

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [user, navigate])

  // Quiz steps configuration
  const steps = [
    {
      id: 'university',
      title: 'What university do you attend?',
      type: 'university-search',
      required: true
    },
    {
      id: 'personal',
      title: 'Tell us about yourself',
      type: 'personal-info',
      required: true
    },
    {
      id: 'identity',
      title: 'Identity & Preferences',
      type: 'identity',
      required: true
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Preferences',
      type: 'lifestyle',
      required: true
    },
    {
      id: 'living',
      title: 'Living Preferences',
      type: 'living-preferences',
      required: true
    },
    {
      id: 'interests',
      title: 'Interests & Hobbies',
      type: 'interests',
      required: false
    }
  ]

  const handleStepComplete = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  const generateSearchIndexes = (data) => {
    // Generate compound indexes for O(1) matching
    const indexes = {}
    
    // Basic combinations
    if (data.gender && data.university) {
      indexes[`${data.gender}_${data.university}`] = true
    }
    
    if (data.gender && data.smoking) {
      indexes[`${data.gender}_${data.smoking}`] = true
    }
    
    if (data.university && data.smoking) {
      indexes[`${data.university}_${data.smoking}`] = true
    }
    
    // Triple combinations
    if (data.gender && data.university && data.smoking) {
      indexes[`${data.gender}_${data.university}_${data.smoking}`] = true
    }
    
    if (data.gender && data.cleanliness && data.studyHabits) {
      indexes[`${data.gender}_${data.cleanliness}_${data.studyHabits}`] = true
    }
    
    return indexes
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      
      // Calculate age from birthday
      const age = formData.birthday ? calculateAge(formData.birthday) : null
      
      // Prepare user profile data
      const profileData = {
        // Personal Information
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthday: formData.birthday,
        age: age,
        
        // University & Academic
        university: formData.university,
        major: formData.major,
        minor: formData.minor,
        graduationYear: formData.graduationYear,
        
        // Identity
        gender: formData.gender,
        sexuality: formData.sexuality,
        religion: formData.religion,
        
        // Lifestyle
        smoking: formData.smoking,
        drinking: formData.drinking,
        pets: formData.pets,
        petType: formData.petType,
        
        // Living Preferences
        cleanliness: formData.cleanliness,
        studyHabits: formData.studyHabits,
        socialLevel: formData.socialLevel,
        sleepSchedule: formData.sleepSchedule,
        
        // Interests
        interests: formData.interests || [],
        hobbies: formData.hobbies || [],
        
        // System fields
        profileComplete: true,
        completedAt: new Date(),
        searchIndexes: generateSearchIndexes(formData)
      }
      
      await updateUserProfile(profileData)
      setShowSuccess(true)
      
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving your profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    navigate('/')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        {/* Progress bar */}
        <div className="progress-bar">
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Current step */}
        <OnboardingStep
          step={steps[currentStep]}
          formData={formData}
          onComplete={handleStepComplete}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentStep > 0}
          isLastStep={currentStep === steps.length - 1}
          loading={loading}
        />
      </div>

      {/* Success modal */}
      {showSuccess && (
        <SuccessModal onClose={handleSuccessClose} />
      )}
    </div>
  )
}

export default OnboardingPage
