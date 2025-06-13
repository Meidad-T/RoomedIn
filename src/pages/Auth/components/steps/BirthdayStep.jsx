import { useState, useEffect } from 'react'

const BirthdayStep = ({ data, onChange, onValidationChange }) => {
  const [month, setMonth] = useState(data.birthMonth || '')
  const [day, setDay] = useState(data.birthDay || '')
  const [year, setYear] = useState(data.birthYear || '')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (month, year) => {
    if (!month || !year) return 31
    return new Date(year, month, 0).getDate()
  }

  const calculateAge = (month, day, year) => {
    if (!month || !day || !year) return null
    const today = new Date()
    const birthDate = new Date(year, month - 1, day)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  useEffect(() => {
    const isValid = month && day && year && year >= 1950 && year <= new Date().getFullYear() - 16
    onValidationChange(isValid)

    if (isValid) {
      const age = calculateAge(month, day, year)
      // Create a proper birthday date string (YYYY-MM-DD format)
      const birthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      onChange({
        birthMonth: month,
        birthDay: day,
        birthYear: year,
        birthday: birthday,
        age: age
      })
    }
  }, [month, day, year, onChange, onValidationChange])

  const age = calculateAge(month, day, year)

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="date-group large-date-group">
          <select
            className="form-input"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {months.map((monthName, index) => (
              <option key={index} value={index + 1}>
                {monthName}
              </option>
            ))}
          </select>
          
          <select
            className="form-input"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {Array.from({ length: getDaysInMonth(month, year) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          
          <select
            className="form-input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {Array.from({ length: 50 }, (_, i) => {
              const yearOption = new Date().getFullYear() - 16 - i
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              )
            })}
          </select>
        </div>
        
        {age && (
          <div className="age-display">
            You are {age} years old
          </div>
        )}
        
        <div className="helper-text">
          You must be at least 16 years old to use RoomedIn
        </div>
      </div>
    </div>
  )
}

export default BirthdayStep
