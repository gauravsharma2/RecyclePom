import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaPaw } from 'react-icons/fa'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/adopt', label: 'Adopt' },
  { path: '/foster', label: 'Foster' },
  { path: '/donate', label: 'Donate' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
          <FaPaw className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Recycled <strong>Poms</strong>
          </span>
        </Link>

        <ul className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="navbar__cta-mobile">
            <Link to="/donate" className="btn btn-primary" onClick={() => setIsOpen(false)}>
              Donate Now
            </Link>
          </li>
        </ul>

        <Link to="/donate" className="btn btn-primary navbar__cta-desktop">
          Donate Now
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}
