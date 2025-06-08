import { useState, useEffect } from 'react'

const ReligionStep = ({ data, onChange, onValidationChange }) => {
  const [religion, setReligion] = useState(data.religion || '')
  const [customReligion, setCustomReligion] = useState(data.customReligion || '')

  const religionOptions = [
    { id: 'christianity', title: 'Christianity', emoji: '✝️' },
    { id: 'judaism', title: 'Judaism', emoji: '✡️' },
    { id: 'islam', title: 'Islam', emoji: '☪️' },
    { id: 'hindu', title: 'Hindu', emoji: '🕉️' },
    { id: 'buddhist', title: 'Buddhist', emoji: '☸️' },
    { id: 'other', title: 'Other', emoji: '🌍' }
  ]

  useEffect(() => {
    const isValid = religion && (religion !== 'other' || customReligion.trim().length > 0)
    onValidationChange(isValid)

    if (isValid) {
      onChange({
        religion,
        customReligion: religion === 'other' ? customReligion.trim() : ''
      })
    }
  }, [religion, customReligion, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="religion-grid large-cards">
          {religionOptions.slice(0, 3).map((option) => (
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
        <div className="religion-grid-bottom large-cards">
          {religionOptions.slice(3).map((option) => (
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

        {religion === 'other' && (
          <div className="form-group" style={{ marginTop: '2rem' }}>
            <input
              type="text"
              className="form-input large-input"
              placeholder="Please specify (max 15 characters)"
              value={customReligion}
              onChange={(e) => setCustomReligion(e.target.value)}
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

export default ReligionStep
