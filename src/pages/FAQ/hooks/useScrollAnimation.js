/**
 * Custom hook for scroll-triggered animations
 * Single responsibility: Handle scroll-based animations and mascot position
 */
import { useState, useEffect } from 'react'

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [mascotPosition, setMascotPosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)

      // Calculate mascot position based on scroll
      const scrollProgress = newScrollY / (document.body.scrollHeight - window.innerHeight)
      const newY = scrollProgress * (window.innerHeight - 200) // Keep mascot in view
      
      setMascotPosition({
        x: Math.sin(scrollProgress * Math.PI * 2) * 20, // Gentle side-to-side movement
        y: newY
      })

      // Determine current section for mascot expression changes
      const sections = document.querySelectorAll('.faq-item')
      let currentSectionIndex = 0
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSectionIndex = index
        }
      })
      
      setCurrentSection(currentSectionIndex)
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  return {
    scrollY,
    mascotPosition,
    currentSection
  }
}
