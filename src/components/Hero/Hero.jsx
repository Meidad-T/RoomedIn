import UniversitySearch from '../UniversitySearch/UniversitySearch'
import './Hero.css'

const Hero = () => {
  const handleUniversitySelect = (university) => {
    console.log('Selected university:', university)
    // TODO: Navigate to university page or handle selection
  }

  return (
    <section className="hero">
      <div className="hero-background">
        {/* City skyline background will be added via CSS */}
      </div>
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-welcome">Welcome to</span> <span className="hero-brand">RoomedIn</span>
            </h1>
            
            <div className="search-container">
              <UniversitySearch onUniversitySelect={handleUniversitySelect} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
