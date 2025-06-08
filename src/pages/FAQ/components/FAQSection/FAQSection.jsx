import { useState, useEffect, useRef } from 'react'
import './FAQSection.css'

const FAQSection = () => {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRef = useRef(null)

  const faqData = [
    {
      id: 1,
      title: "Why is RoomedIn free?",
      description: "As international students, we all struggled through this part of college, so we wanted to make sure that others will never face this struggle again. Making it free was even better, since we love supporting students - the future of our world!",
      image: "why_free.png",
      layout: "left" // Image on left, text on right
    },
    {
      id: 2,
      title: "How does RoomedIn work?",
      description: "We find and connect you with other people who are looking for housing on or off campus, just like you! All connections are made OFF of the site, by us bridging you by giving them the information of the match. Please see our full privacy and security policy for the most up to date information if you have any concerns!",
      image: "how_it_works.png",
      layout: "right" // Image on right, text on left
    },
    {
      id: 3,
      title: "How do you match students together?",
      description: "Our smart matching system considers your preferences for location, budget, lifestyle, study habits, and more! We use advanced algorithms to find the most compatible roommates based on your profile and preferences.",
      image: "great_match.png",
      layout: "left" // Image on left, text on right
    },
    {
      id: 4,
      title: "What if I don't like my match?",
      description: "No worries! You're never obligated to room with anyone. We provide multiple matches so you can choose the best fit. You can also update your preferences anytime to get better matches.",
      image: "heart_break.png",
      layout: "right" // Image on right, text on left
    }
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.dataset.sectionId)
            setVisibleSections(prev => new Set([...prev, sectionId]))
          }
        })
      },
      { threshold: 0.2 }
    )

    const sectionElements = sectionRef.current?.querySelectorAll('.faq-feature-section')
    sectionElements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="faq-section" ref={sectionRef}>
      {faqData.map((faq, index) => (
        <div
          key={faq.id}
          className={`faq-feature-section ${faq.layout} ${visibleSections.has(faq.id) ? 'visible' : ''}`}
          data-section-id={faq.id}
        >
          <div className="container">
            <div className="faq-feature-content">
              {/* Image Container */}
              <div className="faq-image-container">
                <div className="faq-image-wrapper">
                  <img
                    src={`/src/pages/FAQ/assets/images/${faq.image}`}
                    alt={faq.title}
                    className="faq-feature-image"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="faq-image-placeholder" style={{ display: 'none' }}>
                    <div className="placeholder-icon">🎨</div>
                    <p>Add {faq.image} to see the illustration!</p>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="faq-text-container">
                <div className="faq-text-content">
                  <h2 className="faq-feature-title">{faq.title}</h2>
                  <p className="faq-feature-description">{faq.description}</p>
                </div>
              </div>
            </div>
          </div>


        </div>
      ))}

      {/* Contact section at the bottom */}
      <div className="faq-contact-section">
        <div className="container">
          <div className="faq-contact-content">
            <p className="faq-contact-text">
              Got more questions? Please let us know by sending us an email at{' '}
              <a href="mailto:roomedinhelp@gmail.com" className="faq-contact-email">
                roomedinhelp@gmail.com
              </a>{' '}
              and we will do our best to get back to you!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
