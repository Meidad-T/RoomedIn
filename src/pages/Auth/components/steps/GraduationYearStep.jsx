import { useState, useEffect } from 'react'

const GraduationYearStep = ({ data, onChange, onValidationChange }) => {
  const [graduationYear, setGraduationYear] = useState(data.graduationYear || '')

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)

  useEffect(() => {
    const isValid = graduationYear && graduationYear >= currentYear
    onValidationChange(isValid)
    
    if (isValid) {
      onChange({ graduationYear: parseInt(graduationYear) })
    }
  }, [graduationYear, onChange, onValidationChange, currentYear])

  return (
    <div className="single-question-step">
      <div className="form-group">
        <select
          className="form-input large-input"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          autoFocus
        >
          <option value="">Select graduation year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="helper-text">
          When do you expect to graduate?
        </div>
      </div>
    </div>
  )
}

export default GraduationYearStep
