import { useState, useEffect } from 'react'

const InterestsStep = ({ data, onChange, onValidationChange }) => {
  const [selectedInterests, setSelectedInterests] = useState(data.interests || [])
  const [selectedHobbies, setSelectedHobbies] = useState(data.hobbies || [])
  const [customInterest, setCustomInterest] = useState('')
  const [customHobby, setCustomHobby] = useState('')

  // This step is optional, so always valid
  useEffect(() => {
    onValidationChange(true)
  }, [onValidationChange])

  // Update parent component
  useEffect(() => {
    onChange({
      interests: selectedInterests,
      hobbies: selectedHobbies
    })
  }, [selectedInterests, selectedHobbies, onChange])

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

  const hobbyOptions = [
    { id: 'hiking', title: 'Hiking', emoji: '🥾' },
    { id: 'yoga', title: 'Yoga', emoji: '🧘' },
    { id: 'dancing', title: 'Dancing', emoji: '💃' },
    { id: 'writing', title: 'Writing', emoji: '✍️' },
    { id: 'gardening', title: 'Gardening', emoji: '🌱' },
    { id: 'volunteering', title: 'Volunteering', emoji: '🤝' },
    { id: 'board-games', title: 'Board Games', emoji: '🎲' },
    { id: 'crafts', title: 'Crafts & DIY', emoji: '🧵' },
    { id: 'meditation', title: 'Meditation', emoji: '🕯️' },
    { id: 'cycling', title: 'Cycling', emoji: '🚴' },
    { id: 'swimming', title: 'Swimming', emoji: '🏊' },
    { id: 'languages', title: 'Learning Languages', emoji: '🗣️' }
  ]

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const toggleHobby = (hobbyId) => {
    setSelectedHobbies(prev => 
      prev.includes(hobbyId)
        ? prev.filter(id => id !== hobbyId)
        : [...prev, hobbyId]
    )
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()])
      setCustomInterest('')
    }
  }

  const addCustomHobby = () => {
    if (customHobby.trim() && !selectedHobbies.includes(customHobby.trim())) {
      setSelectedHobbies(prev => [...prev, customHobby.trim()])
      setCustomHobby('')
    }
  }

  const removeCustomItem = (item, type) => {
    if (type === 'interest') {
      setSelectedInterests(prev => prev.filter(i => i !== item))
    } else {
      setSelectedHobbies(prev => prev.filter(h => h !== item))
    }
  }

  return (
    <div className="interests-step">
      <div className="step-intro">
        <p className="helper-text">
          This step is optional but helps us find roommates with similar interests! 
          Select as many as you'd like.
        </p>
      </div>

      {/* Interests */}
      <div className="form-group">
        <label className="form-label">
          What are your interests?
        </label>
        <div className="multi-select-grid">
          {interestOptions.map((option) => (
            <div
              key={option.id}
              className={`multi-choice-card ${selectedInterests.includes(option.id) ? 'selected' : ''}`}
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
            <button onClick={() => removeCustomItem(customInt, 'interest')}>×</button>
          </div>
        ))}
      </div>

      {/* Hobbies */}
      <div className="form-group">
        <label className="form-label">
          What are your hobbies?
        </label>
        <div className="multi-select-grid">
          {hobbyOptions.map((option) => (
            <div
              key={option.id}
              className={`multi-choice-card ${selectedHobbies.includes(option.id) ? 'selected' : ''}`}
              onClick={() => toggleHobby(option.id)}
            >
              <div className="choice-emoji">{option.emoji}</div>
              <h3 className="choice-title">{option.title}</h3>
            </div>
          ))}
        </div>

        {/* Custom Hobby Input */}
        <div className="custom-input-group">
          <input
            type="text"
            className="form-input"
            placeholder="Add a custom hobby..."
            value={customHobby}
            onChange={(e) => setCustomHobby(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomHobby()}
            maxLength={30}
          />
          <button
            type="button"
            onClick={addCustomHobby}
            className="add-custom-btn"
            disabled={!customHobby.trim()}
          >
            Add
          </button>
        </div>

        {/* Display custom hobbies */}
        {selectedHobbies.filter(hobby => !hobbyOptions.find(opt => opt.id === hobby)).map(customHob => (
          <div key={customHob} className="custom-tag">
            <span>{customHob}</span>
            <button onClick={() => removeCustomItem(customHob, 'hobby')}>×</button>
          </div>
        ))}
      </div>

      <div className="helper-text">
        Selected {selectedInterests.length} interests and {selectedHobbies.length} hobbies. 
        This helps us find roommates you'll have things in common with!
      </div>
    </div>
  )
}

export default InterestsStep
