import './FAQHeader.css'

const FAQHeader = () => {
  const handleHomeClick = () => {
    // Navigate back to home page
    window.location.href = '/'
  }

  return (
    <header className="faq-header">
      <div className="container">
        <div className="faq-header-content">
          {/* Logo */}
          <div className="faq-logo" onClick={handleHomeClick}>
            <div className="faq-logo-icon">
              <img
                src="/src/assets/images/Nav_bar_logo.png"
                alt="RoomedIn Logo"
                className="faq-logo-image"
                onError={(e) => {
                  // Fallback to SVG if image not found
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'none' }}
                className="faq-logo-fallback"
              >
                <circle cx="20" cy="20" r="18" fill="var(--primary-green)" stroke="var(--primary-green-dark)" strokeWidth="2"/>
                <path d="M12 16h16v12H12V16z" fill="white" stroke="var(--primary-green-dark)" strokeWidth="1.5"/>
                <path d="M16 12v4M24 12v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="20" r="1.5" fill="var(--primary-green-dark)"/>
                <circle cx="22" cy="20" r="1.5" fill="var(--primary-green-dark)"/>
                <path d="M16 24h8" stroke="var(--primary-green-dark)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="faq-nav">
            <button onClick={handleHomeClick} className="faq-nav-link">
              <div className="faq-nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10l7-7 7 7M5 8v8a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h2a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Home
            </button>
            <a href="#signin" className="faq-nav-link">
              <div className="faq-nav-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 18c0-4 2.5-6 6-6s6 2 6 6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              Sign in
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default FAQHeader
