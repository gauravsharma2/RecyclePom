import { Link } from 'react-router-dom'
import { FaPaw, FaFacebookF, FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill="var(--color-text)"
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      <div className="footer__content">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <FaPaw />
                <span>Recycled <strong>Poms</strong></span>
              </div>
              <p className="footer__tagline">
                Giving Pomeranians a second chance at a loving life. Every dog
                deserves a forever home.
              </p>
              <div className="footer__social">
                <a
                  href="https://www.facebook.com/RecycledPoms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/recycledpoms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a href="mailto:info@recycledpoms.org" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div className="footer__nav">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/adopt">Adopt a Pom</Link></li>
                <li><Link to="/foster">Become a Foster</Link></li>
                <li><Link to="/donate">Donate</Link></li>
                <li><Link to="/events">Events</Link></li>
              </ul>
            </div>

            <div className="footer__nav">
              <h4>About Us</h4>
              <ul>
                <li><Link to="/about">Our Mission</Link></li>
                <li><Link to="/about">Success Stories</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li>
                  <a href="https://recycledpoms.org/" target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__newsletter">
              <h4>Stay Updated</h4>
              <p>Get the latest rescue stories and events in your inbox.</p>
              <form className="footer__form" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="footer__input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="footer__bottom">
            <p>
              &copy; {new Date().getFullYear()} Recycled Pomeranians. Made with{' '}
              <FaHeart className="footer__heart" /> for dogs everywhere.
            </p>
            <p className="footer__nonprofit">
              Recycled Pomeranians is a 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
