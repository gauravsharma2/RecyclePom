import { Link } from 'react-router-dom'
import {
  FaPaw,
  FaHandHoldingHeart,
  FaHome,
  FaDonate,
  FaArrowRight,
  FaQuoteLeft,
  FaHeart,
} from 'react-icons/fa'
import DogCard from '../components/DogCard'
import { dogs, successStories, stats } from '../data'
import './Home.css'

export default function Home() {
  const featuredDogs = dogs.filter(d => d.status === 'available').slice(0, 3)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content container">
          <div className="hero__text">
            <span className="hero__badge">
              <FaPaw /> Rescue. Rehabilitate. Rehome.
            </span>
            <h1 className="hero__title">
              Every Pom Deserves a <span>Second Chance</span>
            </h1>
            <p className="hero__subtitle">
              Recycled Pomeranians is a volunteer-run rescue dedicated to saving
              Pomeranians from shelters, surrenders, and unsafe situations —
              giving them the love they&apos;ve always deserved.
            </p>
            <div className="hero__actions">
              <Link to="/adopt" className="btn btn-primary btn-lg">
                <FaPaw /> Adopt a Pom
              </Link>
              <Link to="/foster" className="btn btn-white btn-lg">
                <FaHome /> Become a Foster
              </Link>
            </div>
          </div>
          <div className="hero__image-area">
            <div className="hero__image-circle">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&h=700&fit=crop"
                alt="Happy Pomeranian"
              />
            </div>
            <div className="hero__float hero__float--1">
              <FaHeart /> 500+ Rescued
            </div>
            <div className="hero__float hero__float--2">
              <FaPaw /> 450+ Adopted
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-bar">
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title">How You Can Help</h2>
          <p className="section-subtitle">
            There are many ways to make a difference in a Pomeranian&apos;s life.
          </p>
          <div className="grid grid-4 how-it-works__grid">
            {[
              {
                icon: <FaPaw />,
                title: 'Adopt',
                desc: 'Give a rescued Pomeranian their forever home and a second chance at happiness.',
                link: '/adopt',
                color: 'var(--color-primary)',
              },
              {
                icon: <FaHome />,
                title: 'Foster',
                desc: 'Open your home temporarily and help a Pom heal and prepare for adoption.',
                link: '/foster',
                color: 'var(--color-secondary)',
              },
              {
                icon: <FaDonate />,
                title: 'Donate',
                desc: 'Your donation covers vet bills, food, supplies, and life-saving medical care.',
                link: '/donate',
                color: 'var(--color-accent-dark)',
              },
              {
                icon: <FaHandHoldingHeart />,
                title: 'Volunteer',
                desc: 'Help with transport, events, social media, and more. Every hand makes a difference.',
                link: '/contact',
                color: '#9b59b6',
              },
            ].map(item => (
              <Link to={item.link} key={item.title} className="how-card card">
                <div
                  className="how-card__icon"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="how-card__arrow" style={{ color: item.color }}>
                  Learn More <FaArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED DOGS ===== */}
      <section className="section featured-dogs">
        <div className="container">
          <h2 className="section-title">Meet Our Poms</h2>
          <p className="section-subtitle">
            These adorable Pomeranians are waiting for their forever families.
          </p>
          <div className="grid grid-3">
            {featuredDogs.map(dog => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
          <div className="featured-dogs__cta">
            <Link to="/adopt" className="btn btn-outline btn-lg">
              View All Adoptable Dogs <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="section stories-section">
        <div className="container">
          <h2 className="section-title">Happy Tails</h2>
          <p className="section-subtitle">
            Every adoption is a success story. Here are just a few.
          </p>
          <div className="grid grid-3 stories__grid">
            {successStories.map(story => (
              <div key={story.id} className="story-card card">
                <img
                  src={story.image}
                  alt={story.dogName}
                  className="story-card__image"
                  loading="lazy"
                />
                <div className="story-card__body">
                  <FaQuoteLeft className="story-card__quote" />
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

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <div className="cta-banner__text">
              <h2>Ready to Change a Life?</h2>
              <p>
                Whether you adopt, foster, donate, or volunteer — you are giving
                a Pomeranian the second chance they deserve.
              </p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/donate" className="btn btn-white btn-lg">
                <FaDonate /> Donate Now
              </Link>
              <Link to="/adopt" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                <FaPaw /> Adopt a Pom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
