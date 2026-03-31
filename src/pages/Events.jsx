import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPaw } from 'react-icons/fa'
import SEO from '../components/SEO'
import { useData } from '../context/DataContext'
import './Events.css'

const typeColors = {
  adoption: { bg: 'rgba(212, 87, 123, 0.1)', color: 'var(--color-primary)', label: 'Adoption Event' },
  workshop: { bg: 'rgba(74, 124, 111, 0.1)', color: 'var(--color-secondary)', label: 'Workshop' },
  fundraiser: { bg: 'rgba(245, 200, 66, 0.15)', color: 'var(--color-accent-dark)', label: 'Fundraiser' },
}

export default function Events() {
  const { events } = useData()

  return (
    <div className="events-page">
      <SEO title="Events" description="Join us at upcoming adoption events, workshops, and fundraisers. Meet Pomeranians in person!" path="/events" />
      <section className="page-hero page-hero--events">
        <div className="container">
          <h1 className="page-hero__title">Events &amp; News</h1>
          <p className="page-hero__subtitle">
            Join us at upcoming events, meet adorable Poms, and help raise funds
            for our rescue mission.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Mark your calendar and come support the Poms!
          </p>

          <div className="events-list">
            {events.map(event => {
              const typeInfo = typeColors[event.type]
              return (
                <div key={event.id} className="event-card card">
                  <div className="event-card__badge" style={{ background: typeInfo.bg, color: typeInfo.color }}>
                    {typeInfo.label}
                  </div>
                  <h3 className="event-card__title">{event.title}</h3>
                  <p className="event-card__desc">{event.description}</p>
                  <div className="event-card__details">
                    <span><FaCalendarAlt /> {event.date}</span>
                    <span><FaClock /> {event.time}</span>
                    <span><FaMapMarkerAlt /> {event.location}</span>
                  </div>
                  <button className="btn btn-outline event-card__btn">
                    <FaPaw /> RSVP / Learn More
                  </button>
                </div>
              )
            })}
          </div>

          <div className="events-cta">
            <div className="events-cta__inner">
              <h3>Want to Host an Event?</h3>
              <p>
                We&apos;re always looking for partners to host adoption events,
                fundraisers, and awareness campaigns. Get in touch!
              </p>
              <a href="mailto:events@recycledpoms.org" className="btn btn-secondary">
                Contact Us About Events
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
