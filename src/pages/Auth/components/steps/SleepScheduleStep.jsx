import { useState, useEffect } from 'react'

const SleepScheduleStep = ({ data, onChange, onValidationChange }) => {
  const [sleepSchedule, setSleepSchedule] = useState(data.sleepSchedule || '')

  const sleepOptions = [
    { id: 'early-bird', title: 'Early Bird', emoji: '🌅' },
    { id: 'normal', title: 'Normal', emoji: '😴' },
    { id: 'night-owl', title: 'Night Owl', emoji: '🦉' },
    { id: 'irregular', title: 'Irregular', emoji: '🔄' }
  ]

  useEffect(() => {
    const isValid = !!sleepSchedule
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ sleepSchedule })
    }
  }, [sleepSchedule, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {sleepOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${sleepSchedule === option.id ? 'selected' : ''}`}
              onClick={() => setSleepSchedule(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              {option.subtitle && (
                <p className="choice-subtitle">{option.subtitle}</p>
              )}
            </div>
          ))}
        </div>
        <div className="helper-text">
          What time do you usually sleep?
        </div>
      </div>
    </div>
  )
}

export default SleepScheduleStep
