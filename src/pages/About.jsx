import { FaHeart, FaPaw, FaHandHoldingHeart, FaFacebookF, FaInstagram, FaGlobe } from 'react-icons/fa'
import { stats, teamMembers, successStories } from '../data'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero page-hero--about">
        <div className="container">
          <h1 className="page-hero__title">About Recycled Pomeranians</h1>
          <p className="page-hero__subtitle">
            A passionate volunteer-run rescue dedicated to giving Pomeranians a
            second chance at a happy, healthy life.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="about-mission">
            <div className="about-mission__text">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Our Mission</h2>
              <p>
                Recycled Pomeranians was founded with a simple but powerful mission:
                to rescue, rehabilitate, and rehome Pomeranians in need. We pull
                dogs from overcrowded shelters, owner surrenders, puppy mills, and
                neglect situations.
              </p>
              <p>
                Every Pom that comes into our rescue receives complete veterinary
                care, grooming, behavioral assessment, and placement in a loving
                foster home until their forever family is found.
              </p>
              <p>
                We are 100% volunteer-run and rely entirely on donations, adoption
                fees, and fundraising events. Every cent goes directly to the dogs.
              </p>
              <div className="about-mission__values">
                <div className="about-value">
                  <FaHeart className="about-value__icon" />
                  <span>Compassion First</span>
                </div>
                <div className="about-value">
                  <FaPaw className="about-value__icon" />
                  <span>Every Dog Matters</span>
                </div>
                <div className="about-value">
                  <FaHandHoldingHeart className="about-value__icon" />
                  <span>Community Driven</span>
                </div>
              </div>
            </div>
            <div className="about-mission__image">
              <img
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=700&fit=crop"
                alt="Rescued Pomeranian"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map(stat => (
              <div key={stat.label} className="stats-bar__item">
                <span className="stats-bar__value">{stat.value}</span>
                <span className="stats-bar__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            The dedicated volunteers behind every rescue.
          </p>
          <div className="grid grid-3 about-team">
            {teamMembers.map(member => (
              <div key={member.name} className="team-card card">
                <img src={member.image} alt={member.name} className="team-card__image" loading="lazy" />
                <div className="team-card__body">
                  <h3>{member.name}</h3>
                  <span className="team-card__role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section about-stories-section">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            The happy endings that keep us going.
          </p>
          <div className="grid grid-3">
            {successStories.map(story => (
              <div key={story.id} className="story-card card">
                <img src={story.image} alt={story.dogName} className="story-card__image" loading="lazy" />
                <div className="story-card__body">
                  <p className="story-card__text">{story.story}</p>
                  <div className="story-card__footer">
                    <strong>{story.dogName}</strong>
                    <span>&amp; {story.family}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="section about-connect">
        <div className="container">
          <h2 className="section-title">Connect With Us</h2>
          <p className="section-subtitle">
            Follow our journey and see the Poms we&apos;re saving every day.
          </p>
          <div className="about-social-links">
            <a href="https://www.facebook.com/RecycledPoms/" target="_blank" rel="noopener noreferrer" className="about-social-link">
              <FaFacebookF /> Facebook
            </a>
            <a href="https://www.instagram.com/recycledpoms/" target="_blank" rel="noopener noreferrer" className="about-social-link">
              <FaInstagram /> Instagram
            </a>
            <a href="https://recycledpoms.org/" target="_blank" rel="noopener noreferrer" className="about-social-link">
              <FaGlobe /> Website
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
