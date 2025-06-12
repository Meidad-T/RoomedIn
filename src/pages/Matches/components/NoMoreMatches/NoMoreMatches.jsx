import { useNavigate } from 'react-router-dom'
import './NoMoreMatches.css'

const NoMoreMatches = ({ universityName }) => {
  const navigate = useNavigate()

  return (
    <div className="no-more-matches">
      <div className="no-more-content">
        {/* Image */}
        <div className="no-more-image">
          <img
            src="/src/pages/Matches/assets/images/no_more_options.png"
            alt="No more options"
            className="no-more-img"
            onError={(e) => {
              // Fallback if image not found
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'block'
            }}
          />
          {/* Fallback SVG */}
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="no-more-fallback"
            style={{ display: 'none' }}
          >
            <circle cx="100" cy="100" r="80" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2"/>
            <path d="M70 90h60M70 110h40" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="85" cy="75" r="3" fill="#9ca3af"/>
            <circle cx="115" cy="75" r="3" fill="#9ca3af"/>
          </svg>
        </div>

        {/* Text Content */}
        <div className="no-more-text">
          <h2 className="no-more-title">
            No More Results
          </h2>
          <p className="no-more-description">
            You've seen all the students currently looking for roommates near{' '}
            <span className="university-highlight">{universityName}</span>.
          </p>
          <p className="no-more-suggestion">
            Check back regularly as new students might join and are also looking for roommates near your school!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="no-more-actions">
          <button 
            onClick={() => navigate('/')}
            className="back-home-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L2.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="refresh-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M1 4v6h6M19 16v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m18.36 4.36A9 9 0 0 1 14.36 19.36L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Check Again
          </button>
        </div>

        {/* Tips */}
        <div className="no-more-tips">
          <h3 className="tips-title">💡 Tips to find more matches:</h3>
          <ul className="tips-list">
            <li>Share RoomedIn with friends at your university</li>
            <li>Check back in a few days for new students</li>
            <li>Make sure your profile is complete and appealing</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NoMoreMatches
