import { useEffect } from 'react'
import FAQHeader from './components/Header/FAQHeader'
import FAQHero from './components/Hero/FAQHero'
import FAQSection from './components/FAQSection/FAQSection'
import './FAQPage.css'

const FAQPage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Set page title
    document.title = 'FAQ - RoomedIn | Your Questions Answered'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="faq-page">
      <FAQHeader />
      <main className="faq-main">
        <FAQHero />
        <FAQSection />
      </main>
    </div>
  )
}

export default FAQPage
