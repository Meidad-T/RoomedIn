import { useState, useEffect } from 'react'

const StudyHabitsStep = ({ data, onChange, onValidationChange }) => {
  const [studyHabits, setStudyHabits] = useState(data.studyHabits || '')

  const studyOptions = [
    { id: 'library', title: 'Library studier', emoji: '📚', subtitle: 'I study at the library' },
    { id: 'home-quiet', title: 'Quiet at home', emoji: '🤫', subtitle: 'Silent study sessions' },
    { id: 'home-music', title: 'Music at home', emoji: '🎵', subtitle: 'Study with background music' },
    { id: 'group', title: 'Group study', emoji: '👥', subtitle: 'I prefer studying with others' }
  ]

  useEffect(() => {
    const isValid = !!studyHabits
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ studyHabits })
    }
  }, [studyHabits, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="choice-grid four-column large-cards">
          {studyOptions.map((option) => (
            <div
              key={option.id}
              className={`choice-card large-choice-card ${studyHabits === option.id ? 'selected' : ''}`}
              onClick={() => setStudyHabits(option.id)}
            >
              <div className="choice-emoji large-choice-emoji">{option.emoji}</div>
              <h3 className="choice-title large-choice-title">{option.title}</h3>
              <p className="choice-subtitle">{option.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="helper-text">
          What are your study habits?
        </div>
      </div>
    </div>
  )
}

export default StudyHabitsStep
