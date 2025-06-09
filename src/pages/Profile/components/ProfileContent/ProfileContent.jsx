import { useState, useEffect, useRef } from 'react'
import './ProfileContent.css'

const ProfileContent = ({ userProfile, isVisible }) => {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section')
            setVisibleSections(prev => new Set([...prev, sectionId]))
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = sectionRef.current?.querySelectorAll('[data-section]')
    sections?.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const getDisplayValue = (key, value, customValue) => {
    if (value === 'other' && customValue) {
      return customValue
    }
    return value
  }

  const formatFieldName = (key) => {
    const fieldNames = {
      gender: 'Gender',
      sexuality: 'Sexual Orientation',
      religion: 'Religion',
      smoking: 'Smoking',
      drinking: 'Drinking',
      pets: 'Pets',
      cleanliness: 'Cleanliness Level',
      studyHabits: 'Study Habits',
      socialLevel: 'Social Level',
      sleepSchedule: 'Sleep Schedule',
      interests: 'Interests',
      hobbies: 'Hobbies'
    }
    return fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)
  }

  const getEmojiForField = (key, value) => {
    const emojiMap = {
      gender: { male: '👨', female: '👩' },
      sexuality: { straight: '💕', gay: '🏳️‍🌈', lesbian: '🏳️‍🌈', bisexual: '💖', other: '🌈' },
      religion: { christian: '✝️', muslim: '☪️', jewish: '✡️', hindu: '🕉️', buddhist: '☸️', atheist: '🔬', agnostic: '🤔', other: '🙏' },
      smoking: { never: '🚭', occasionally: '🌬️', regularly: '🚬' },
      drinking: { never: '🚫', occasionally: '🍷', regularly: '🍺' },
      pets: { none: '🚫', dog: '🐕', cat: '🐱', other: '🐾' },
      cleanliness: { 'very-clean': '✨', clean: '🧹', average: '🏠', messy: '🤷' },
      studyHabits: { library: '📚', 'home-quiet': '🤫', 'home-music': '🎵', group: '👥' },
      socialLevel: { 'very-social': '🎉', social: '😊', moderate: '😌', introverted: '📖' },
      sleepSchedule: { 'early-bird': '🌅', normal: '😴', 'night-owl': '🦉', irregular: '🔄' }
    }
    return emojiMap[key]?.[value] || '📝'
  }

  const profileSections = [
    {
      id: 'identity',
      title: 'Identity & Background',
      fields: ['gender', 'sexuality', 'religion'],
      color: '#3498db'
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Preferences',
      fields: ['smoking', 'drinking', 'pets'],
      color: '#e74c3c'
    },
    {
      id: 'living',
      title: 'Living Habits',
      fields: ['cleanliness', 'studyHabits', 'socialLevel', 'sleepSchedule'],
      color: '#2ecc71'
    },
    {
      id: 'interests',
      title: 'Interests & Hobbies',
      fields: ['interests', 'hobbies'],
      color: '#f39c12'
    }
  ]

  return (
    <section className="profile-content" ref={sectionRef}>
      <div className="container">
        <div className="profile-content-header">
          <h2 className="profile-content-title">Your Profile Details</h2>
          <p className="profile-content-subtitle">
            Here are all your answers that help us find your perfect roommate match!
          </p>
        </div>

        <div className="profile-sections">
          {profileSections.map((section, index) => (
            <div
              key={section.id}
              className={`profile-section ${visibleSections.has(section.id) ? 'visible' : ''}`}
              data-section={section.id}
              style={{ '--section-color': section.color }}
            >
              <div className="profile-section-header">
                <h3 className="profile-section-title">{section.title}</h3>
              </div>
              
              <div className="profile-fields-grid">
                {section.fields.map(field => {
                  const value = userProfile[field]
                  const customValue = userProfile[`custom${field.charAt(0).toUpperCase() + field.slice(1)}`]
                  const displayValue = getDisplayValue(field, value, customValue)
                  
                  if (!displayValue) return null

                  return (
                    <div key={field} className="profile-field-card">
                      <div className="profile-field-icon">
                        {getEmojiForField(field, value)}
                      </div>
                      <div className="profile-field-content">
                        <h4 className="profile-field-label">{formatFieldName(field)}</h4>
                        <p className="profile-field-value">
                          {Array.isArray(displayValue) 
                            ? displayValue.join(', ') 
                            : displayValue}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfileContent
