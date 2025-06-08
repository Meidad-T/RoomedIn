import { useState, useEffect } from 'react'

const InterestsOnlyStep = ({ data, onChange, onValidationChange }) => {
  const [selectedInterests, setSelectedInterests] = useState(data.interests || [])
  const [customInterest, setCustomInterest] = useState('')

  // This step is optional, so always valid
  useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      interests: selectedInterests
    })
  }, [selectedInterests, onChange])

  const interestOptions = [
    { id: 'sports', title: 'Sports', emoji: '⚽' },
    { id: 'music', title: 'Music', emoji: '🎵' },
    { id: 'movies', title: 'Movies & TV', emoji: '🎬' },
    { id: 'gaming', title: 'Gaming', emoji: '🎮' },
    { id: 'reading', title: 'Reading', emoji: '📚' },
    { id: 'cooking', title: 'Cooking', emoji: '👨‍🍳' },
    { id: 'fitness', title: 'Fitness', emoji: '💪' },
    { id: 'art', title: 'Art & Design', emoji: '🎨' },
    { id: 'travel', title: 'Travel', emoji: '✈️' },
    { id: 'photography', title: 'Photography', emoji: '📸' },
    { id: 'technology', title: 'Technology', emoji: '💻' },
    { id: 'fashion', title: 'Fashion', emoji: '👗' }
  ]

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()])
      setCustomInterest('')
    }
  }

  const removeCustomItem = (item) => {
    setSelectedInterests(prev => prev.filter(i => i !== item))
  }

  return (
    <div className="single-question-step">
      <div className="form-group">
        <div className="multi-select-grid">
          {interestOptions.map((option) => (
            <div
              key={option.id}
              className={`multi-choice-card large-multi-card ${selectedInterests.includes(option.id) ? 'selected' : ''}`}
              onClick={() => toggleInterest(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>

        {/* Custom Interest Input */}
        <div className="custom-input-group">
          <input
            type="text"
            className="form-input"
            placeholder="Add a custom interest..."
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
            maxLength={30}
          />
          <button
            type="button"
            onClick={addCustomInterest}
            className="add-custom-btn"
            disabled={!customInterest.trim()}
          >
            Add
          </button>
        </div>

        {/* Display custom interests */}
        {selectedInterests.filter(interest => !interestOptions.find(opt => opt.id === interest)).map(customInt => (
          <div key={customInt} className="custom-tag">
            <span>{customInt}</span>
            <button onClick={() => removeCustomItem(customInt)}>×</button>
          </div>
        ))}

        <div className="helper-text">
          Selected {selectedInterests.length} interests. This is optional but helps find compatible roommates!
        </div>
      </div>
    </div>
  )
}

export default InterestsOnlyStep
