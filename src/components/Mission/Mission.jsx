import './Mission.css'

const Mission = () => {
  return (
    <section className="mission">
      <div className="container">
        <div className="mission-content">
          <h2 className="mission-title">Our Mission</h2>
          <div className="mission-arrow">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 5v14M5 12l7 7 7-7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mission-description">
            <p>
              At RoomedIn, we believe that finding the perfect roommate is just as important as findding the perfect place to live during your university years. 
              Our mission is to ensure the entire process is simple, safe, and stress-free. We connect students with others who are actively looking for roommates, 
               creating a community where academic success and personal growth thrive.
            </p>
            <p>
              Our platform empowers students to make informed decisions about their living arrangements, 
              ensuring they can focus on what matters most - their education and future. And the best part? it is 100% FREE forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
