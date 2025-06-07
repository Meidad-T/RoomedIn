import { useState, useEffect } from 'react'

const ReligionStep = ({ data, onChange, onValidationChange }) => {
  const [religion, setReligion] = useState(data.religion || '')

  const religionOptions = [
    { id: 'christian', title: 'Christian', emoji: '✝️' },
    { id: 'muslim', title: 'Muslim', emoji: '☪️' },
    { id: 'jewish', title: 'Jewish', emoji: '✡️' },
    { id: 'hindu', title: 'Hindu', emoji: '🕉️' },
    { id: 'buddhist', title: 'Buddhist', emoji: '☸️' },
    { id: 'atheist', title: 'Atheist', emoji: '🔬' },
    { id: 'agnostic', title: 'Agnostic', emoji: '🤔' },
    { id: 'spiritual', title: 'Spiritual', emoji: '🌟' },
    { id: 'other', title: 'Other', emoji: '🌍' },
    { id: 'prefer-not-to-say', title: 'Prefer not to say', emoji: '🤐' }
  ]

  useEffect(() => {
    const isValid = !!religion
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ religion })
    }
  }, [religion, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {religionOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${religion === option.id ? 'selected' : ''}`}
              onClick={() => setReligion(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
        <div className="helper-text">
          This helps us find compatible roommates for you
        </div>
      </div>
    </div>
  )
}

export default ReligionStep
