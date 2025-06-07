import { useState, useEffect } from 'react'

const SexualityStep = ({ data, onChange, onValidationChange }) => {
  const [sexuality, setSexuality] = useState(data.sexuality || '')
  const [customSexuality, setCustomSexuality] = useState(data.customSexuality || '')

  const sexualityOptions = [
    { id: 'straight', title: 'Straight', emoji: '💕' },
    { id: 'gay', title: 'Gay', emoji: '🌈' },
    { id: 'lesbian', title: 'Lesbian', emoji: '🌈' },
    { id: 'bisexual', title: 'Bisexual', emoji: '💜' },
    { id: 'pansexual', title: 'Pansexual', emoji: '💖' },
    { id: 'asexual', title: 'Asexual', emoji: '🖤' },
    { id: 'other', title: 'Other', emoji: '✨' }
  ]

  useEffect(() => {
    const isValid = sexuality && (sexuality !== 'other' || customSexuality.trim().length > 0)
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ 
        sexuality,
        customSexuality: sexuality === 'other' ? customSexuality.trim() : ''
      })
    }
  }, [sexuality, customSexuality, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid three-column large-cards">
          {sexualityOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${sexuality === option.id ? 'selected' : ''}`}
              onClick={() => setSexuality(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
            </div>
          ))}
        </div>
        
        {sexuality === 'other' && (
          <div className="form-group" style={{ marginTop: '2rem' }}>
            <input
              type="text"
              className="form-input large-input"
              placeholder="Please specify (max 15 characters)"
              value={customSexuality}
              onChange={(e) => setCustomSexuality(e.target.value)}
              maxLength={15}
              autoFocus
            />
          </div>
        )}
        
        <div className="helper-text">
          This helps us find compatible roommates for you
        </div>
      </div>
    </div>
  )
}

export default SexualityStep
