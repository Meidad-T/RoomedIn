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

  // Quiz steps configuration - One question per page
  const steps = [
    {
      id: 'university',
      title: 'What university do you attend?',
      type: 'university-search',
      required: true
    },
    {
      id: 'firstName',
      title: "What's your first name?",
      type: 'first-name',
      required: true
    },
    {
      id: 'lastName',
      title: "What's your last name?",
      type: 'last-name',
      required: true
    },
    {
      id: 'birthday',
      title: "When's your birthday?",
      type: 'birthday',
      required: true
    },
    {
      id: 'major',
      title: "What's your major?",
      type: 'major',
      required: true
    },
    {
      id: 'graduationYear',
      title: 'What year do you graduate?',
      type: 'graduation-year',
      required: true
    },
    {
      id: 'gender',
      title: 'Gender assigned at birth',
      type: 'gender',
      required: true
    },
    {
      id: 'sexuality',
      title: 'Sexual orientation',
      type: 'sexuality',
      required: true
    },
    {
      id: 'religion',
      title: 'Religion/Beliefs',
      type: 'religion',
      required: true
    },
    {
      id: 'smoking',
      title: 'Do you smoke or vape?',
      type: 'smoking',
      required: true
    },
    {
      id: 'drinking',
      title: 'Do you drink alcohol?',
      type: 'drinking',
      required: true
    },
    {
      id: 'pets',
      title: 'Do you have pets?',
      type: 'pets',
      required: true
    },
    {
      id: 'cleanliness',
      title: 'How clean are you?',
      type: 'cleanliness',
      required: true
    },
    {
      id: 'studyHabits',
      title: 'What are your study habits?',
      type: 'study-habits',
      required: true
    },
    {
      id: 'socialLevel',
      title: 'How social are you?',
      type: 'social-level',
      required: true
    },
    {
      id: 'sleepSchedule',
      title: 'What time do you usually sleep?',
      type: 'sleep-schedule',
      required: true
    },
    {
      id: 'interests',
      title: 'What are your interests?',
      type: 'interests-only',
      required: false
    },
    {
      id: 'hobbies',
      title: 'What are your hobbies?',
      type: 'hobbies',
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
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          Step {currentStep + 1} of {steps.length} •
          <span className="progress-percentage">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
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

      {/* Success modal */}
      {showSuccess && (
        <SuccessModal onClose={handleSuccessClose} />
      )}
    </div>
  )
}

export default OnboardingPage
