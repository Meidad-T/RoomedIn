import { useNavigate } from 'react-router-dom'
import './NoMoreMatches.css'

const NoMoreMatches = ({ universityName }) => {
  const navigate = useNavigate()

  return (
    <div className="no-more-matches">
      {/* Large Center Image */}
      <div className="no-more-image-container">
        <img
          src="/src/pages/Matches/assets/images/no_more_options.png"
          alt="No more options"
          className="no-more-main-image"
          onError={(e) => {
            // Fallback if image not found
            e.target.style.display = 'none'
            e.target.nextElementSibling.style.display = 'block'
          }}
        />
        {/* Fallback SVG */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="no-more-fallback-svg"
          style={{ display: 'none' }}
        >
          <circle cx="150" cy="150" r="120" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3"/>
          <path d="M100 130h100M100 170h80" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="125" cy="110" r="5" fill="#94a3b8"/>
          <circle cx="175" cy="110" r="5" fill="#94a3b8"/>
          <path d="M120 200c20 20 40 20 60 0" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text Content Below Image */}
      <div className="no-more-content">
        <h1 className="no-more-title">
          No More Results! 🎉
        </h1>
        <p className="no-more-description">
          You've seen all the students currently looking for roommates at{' '}
          <span className="university-highlight">{universityName}</span>
        </p>
        <p className="no-more-suggestion">
          Check back regularly as new students might join and are also looking for roommates near your school!
        </p>

        {/* Action Buttons */}
        <div className="no-more-actions">
          <button
            onClick={() => navigate('/')}
            className="primary-action-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L2.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="secondary-action-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 4v6h6M19 16v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m18.36 4.36A9 9 0 0 1 14.36 19.36L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Check Again
          </button>
        </div>

        {/* Fun Tips Section */}
        <div className="no-more-tips">
          <div className="tips-header">
            <span className="tips-emoji">💡</span>
            <h3 className="tips-title">Ways to find more matches</h3>
          </div>
          <div className="tips-grid">
            <div className="tip-item">
              <span className="tip-emoji">👥</span>
              <p>Share RoomedIn with friends at your university</p>
            </div>
            <div className="tip-item">
              <span className="tip-emoji">⏰</span>
              <p>Check back in a few days for new students</p>
            </div>
            <div className="tip-item">
              <span className="tip-emoji">✨</span>
              <p>Make sure your profile is complete and appealing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoMoreMatches
