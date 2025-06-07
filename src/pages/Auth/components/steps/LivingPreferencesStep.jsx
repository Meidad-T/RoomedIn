import { useState, useEffect } from 'react'

const LivingPreferencesStep = ({ data, onChange, onValidationChange }) => {
  const [cleanliness, setCleanliness] = useState(data.cleanliness || '')
  const [studyHabits, setStudyHabits] = useState(data.studyHabits || '')
  const [socialLevel, setSocialLevel] = useState(data.socialLevel || '')
  const [sleepSchedule, setSleepSchedule] = useState(data.sleepSchedule || '')

  // Update validation
  useEffect(() => {
    const isValid = cleanliness && studyHabits && socialLevel && sleepSchedule
    onValidationChange(isValid)
  }, [cleanliness, studyHabits, socialLevel, sleepSchedule, onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      cleanliness,
      studyHabits,
      socialLevel,
      sleepSchedule
    })
  }, [cleanliness, studyHabits, socialLevel, sleepSchedule, onChange])

  const cleanlinessOptions = [
    { id: 'very-clean', title: 'Very Clean', subtitle: 'Everything organized & spotless', emoji: '✨' },
    { id: 'clean', title: 'Clean', subtitle: 'Tidy and organized', emoji: '🧹' },
    { id: 'moderate', title: 'Moderate', subtitle: 'Clean but lived-in', emoji: '🏠' },
    { id: 'relaxed', title: 'Relaxed', subtitle: 'Comfortable with some mess', emoji: '😌' }
  ]

  const studyOptions = [
    { id: 'very-quiet', title: 'Very Quiet', subtitle: 'Complete silence needed', emoji: '🤫' },
    { id: 'quiet', title: 'Quiet', subtitle: 'Minimal noise preferred', emoji: '📚' },
    { id: 'moderate', title: 'Moderate', subtitle: 'Some background noise OK', emoji: '🎵' },
    { id: 'social', title: 'Social Studier', subtitle: 'Study groups & discussion', emoji: '👥' }
  ]

  const socialOptions = [
    { id: 'very-social', title: 'Very Social', subtitle: 'Love hosting & parties', emoji: '🎉' },
    { id: 'social', title: 'Social', subtitle: 'Enjoy hanging out regularly', emoji: '😊' },
    { id: 'moderate', title: 'Moderate', subtitle: 'Social sometimes', emoji: '🙂' },
    { id: 'private', title: 'Private', subtitle: 'Prefer personal space', emoji: '🏠' }
  ]

  const sleepOptions = [
    { id: 'early-bird', title: 'Early Bird', subtitle: 'Sleep by 10 PM, up by 6 AM', emoji: '🌅' },
    { id: 'normal', title: 'Normal', subtitle: 'Sleep by 11 PM, up by 7 AM', emoji: '😴' },
    { id: 'night-owl', title: 'Night Owl', subtitle: 'Sleep after midnight', emoji: '🦉' },
    { id: 'irregular', title: 'Irregular', subtitle: 'Schedule varies', emoji: '🔄' }
  ]

  return (
    <div className="living-preferences-step">
      {/* Cleanliness */}
      <div className="form-group">
        <label className="form-label">
          How would you describe your cleanliness level? *
        </label>
        <div className="choice-grid two-column">
          {cleanlinessOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${cleanliness === option.id ? 'selected' : ''}`}
              onClick={() => setCleanliness(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Study Habits */}
      <div className="form-group">
        <label className="form-label">
          What are your study habits? *
        </label>
        <div className="choice-grid two-column">
          {studyOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${studyHabits === option.id ? 'selected' : ''}`}
              onClick={() => setStudyHabits(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Level */}
      <div className="form-group">
        <label className="form-label">
          How social are you at home? *
        </label>
        <div className="choice-grid two-column">
          {socialOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${socialLevel === option.id ? 'selected' : ''}`}
              onClick={() => setSocialLevel(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep Schedule */}
      <div className="form-group">
        <label className="form-label">
          What's your sleep schedule like? *
        </label>
        <div className="choice-grid two-column">
          {sleepOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card ${sleepSchedule === option.id ? 'selected' : ''}`}
              onClick={() => setSleepSchedule(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="helper-text">
        * All fields are required. These preferences help us find roommates with compatible living styles.
      </div>
    </div>
  )
}

export default LivingPreferencesStep
