import { useEffect, useState } from 'react'
import './FAQHero.css'

const FAQHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="faq-hero">
      <div className="faq-hero-background">
        {/* Animated background blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="faq-hero-overlay">
        <div className="container">
          <div className="faq-hero-content">
            <div className={`faq-hero-text ${isVisible ? 'animate-in' : ''}`}>
              <h1 className="faq-hero-title">
                <span className="faq-hero-welcome">Frequently Asked</span>
                <span className="faq-hero-brand">Questions</span>
              </h1>
              <p className="faq-hero-subtitle">
                Everything you need to know about RoomedIn! 
                <br />
                Our friendly monkey mascot is here to guide you through the answers! 🐵
              </p>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

export default FAQHero
