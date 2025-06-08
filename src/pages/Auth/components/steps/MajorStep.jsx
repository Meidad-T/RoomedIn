import { useState, useEffect } from 'react'

const MajorStep = ({ data, onChange, onValidationChange }) => {
  const [major, setMajor] = useState(data.major || '')

  useEffect(() => {
    const isValid = major.trim().length >= 2
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ major: major.trim() })
    }
  }, [major, onChange, onValidationChange])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <input
          type="text"
          className="form-input large-input"
          placeholder="e.g., Computer Science, Psychology, Business"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          maxLength={50}
          autoFocus
        />
        <div className="helper-text">
          What are you studying at university?
        </div>
      </div>
    </div>
  )
}

export default MajorStep
