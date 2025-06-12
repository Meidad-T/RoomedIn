import { useEffect } from 'react'
import Header from '../../components/Header/Header'
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
      <Header />
      <main className="faq-main">
        <FAQHero />
        <FAQSection />
      </main>
    </div>
  )
}

export default FAQPage
