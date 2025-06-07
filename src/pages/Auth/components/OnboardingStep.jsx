import { useState, useEffect } from 'react'
import UniversityStep from './steps/UniversityStep'
import FirstNameStep from './steps/FirstNameStep'
import LastNameStep from './steps/LastNameStep'
import BirthdayStep from './steps/BirthdayStep'
import MajorStep from './steps/MajorStep'
import GraduationYearStep from './steps/GraduationYearStep'
import GenderStep from './steps/GenderStep'
import SexualityStep from './steps/SexualityStep'
import ReligionStep from './steps/ReligionStep'
import SmokingStep from './steps/SmokingStep'
import DrinkingStep from './steps/DrinkingStep'
import PetsStep from './steps/PetsStep'
import CleanlinessStep from './steps/CleanlinessStep'
import StudyHabitsStep from './steps/StudyHabitsStep'
import SocialLevelStep from './steps/SocialLevelStep'
import SleepScheduleStep from './steps/SleepScheduleStep'
import InterestsStep from './steps/InterestsStep'
import './OnboardingStep.css'

const OnboardingStep = ({ 
  step, 
  formData, 
  onComplete, 
  onNext, 
  onBack, 
  canGoBack, 
  isLastStep, 
  loading 
}) => {
  const [stepData, setStepData] = useState({})
  const [isValid, setIsValid] = useState(false)

  // Initialize step data from formData
  useEffect(() => {
    setStepData(formData)
  }, [formData])

  const handleStepDataChange = (data) => {
    const newStepData = { ...stepData, ...data }
    setStepData(newStepData)
    onComplete(newStepData)
  }

  const handleNext = () => {
    if (isValid) {
      onNext()
    }
  }

  const renderStepContent = () => {
    const commonProps = {
      data: stepData,
      onChange: handleStepDataChange,
      onValidationChange: setIsValid
    }

    switch (step.type) {
      case 'university-search':
        return <UniversityStep {...commonProps} />

      case 'first-name':
        return <FirstNameStep {...commonProps} />

      case 'last-name':
        return <LastNameStep {...commonProps} />

      case 'birthday':
        return <BirthdayStep {...commonProps} />

      case 'major':
        return <MajorStep {...commonProps} />

      case 'graduation-year':
        return <GraduationYearStep {...commonProps} />

      case 'gender':
        return <GenderStep {...commonProps} />

      case 'sexuality':
        return <SexualityStep {...commonProps} />

      case 'religion':
        return <ReligionStep {...commonProps} />

      case 'smoking':
        return <SmokingStep {...commonProps} />

      case 'drinking':
        return <DrinkingStep {...commonProps} />

      case 'pets':
        return <PetsStep {...commonProps} />

      case 'cleanliness':
        return <CleanlinessStep {...commonProps} />

      case 'study-habits':
        return <StudyHabitsStep {...commonProps} />

      case 'social-level':
        return <SocialLevelStep {...commonProps} />

      case 'sleep-schedule':
        return <SleepScheduleStep {...commonProps} />

      case 'interests':
        return <InterestsStep {...commonProps} />

      default:
        return <div>Unknown step type: {step.type}</div>
    }
  }

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2 className="step-title">{step.title}</h2>
      </div>

      <div className="step-content">
        {renderStepContent()}
      </div>

      <div className="step-navigation">
        {canGoBack && (
          <button 
            type="button" 
            onClick={onBack}
            className="nav-btn nav-btn-back"
            disabled={loading}
          >
            Back
          </button>
        )}
        
        <button 
          type="button" 
          onClick={handleNext}
          className={`nav-btn nav-btn-next ${!isValid ? 'disabled' : ''}`}
          disabled={!isValid || loading}
        >
          {loading ? (
            <span className="loading-spinner">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
              Saving...
            </span>
          ) : (
            isLastStep ? 'Complete Profile' : 'Next'
          )}
        </button>
      </div>
    </div>
  )
}

export default OnboardingStep
