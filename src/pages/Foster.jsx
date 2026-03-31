import { useState } from 'react'
import { FaHeart, FaHome, FaCheckCircle, FaPaw } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'
import { config } from '../config'
import './Foster.css'

export default function Foster() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    housing: '', pets: '', experience: '', availability: '', why: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { serviceId, fosterTemplateId, publicKey } = config.emailjs
    if (serviceId && serviceId !== 'YOUR_SERVICE_ID') {
      setSending(true)
      try {
        await emailjs.send(serviceId, fosterTemplateId, {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          address: form.address,
          housing: form.housing,
          pets: form.pets,
          experience: form.experience,
          availability: form.availability,
          why: form.why,
        }, publicKey)
      } catch {
        // Email sending failed
      }
      setSending(false)
    }
    setSubmitted(true)
  }

  return (
    <div className="foster-page">
      <SEO title="Become a Foster" description="Open your home and heart to a rescued Pomeranian. We provide everything you need — food, supplies, vet care, and 24/7 support." path="/foster" />
      <section className="page-hero page-hero--foster">
        <div className="container">
          <h1 className="page-hero__title">Become a Foster</h1>
          <p className="page-hero__subtitle">
            Fostering saves lives. By opening your home, you give a Pom the time
            and love they need to thrive before finding their forever family.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="foster-benefits">
            <div className="foster-benefit">
              <FaHeart className="foster-benefit__icon" />
              <h3>Save a Life</h3>
              <p>Every foster opens a shelter spot, saving two lives at once.</p>
            </div>
            <div className="foster-benefit">
              <FaHome className="foster-benefit__icon" />
              <h3>We Provide Everything</h3>
              <p>Food, supplies, veterinary care — we cover it all.</p>
            </div>
            <div className="foster-benefit">
              <FaPaw className="foster-benefit__icon" />
              <h3>24/7 Support</h3>
              <p>Our foster coordinator is always just a call or text away.</p>
            </div>
          </div>

          {submitted ? (
            <div className="foster-success">
              <FaCheckCircle className="foster-success__icon" />
              <h2>Application Submitted!</h2>
              <p>
                Thank you for your interest in fostering! Our foster coordinator
                will review your application and reach out within 3-5 business
                days. In the meantime, follow us on{' '}
                <a
                  href="https://www.instagram.com/recycledpoms/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>{' '}
                for rescue updates!
              </p>
            </div>
          ) : (
            <div className="foster-form-wrapper">
              <h2 className="section-title">Foster Application</h2>
              <p className="section-subtitle">
                Fill out the form below and we&apos;ll get back to you soon!
              </p>
              <form className="foster-form" onSubmit={handleSubmit}>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-input" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" name="email" className="form-input" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input type="tel" name="phone" className="form-input" required value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-input" value={form.address} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Housing Type *</label>
                  <select name="housing" className="form-select" required value={form.housing} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Pets</label>
                  <input type="text" name="pets" className="form-input" placeholder="e.g. 1 dog, 2 cats" value={form.pets} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Pet Experience</label>
                  <textarea name="experience" className="form-textarea" placeholder="Tell us about your experience with dogs..." value={form.experience} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Availability</label>
                  <select name="availability" className="form-select" value={form.availability} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-2weeks">In 1-2 weeks</option>
                    <option value="1month">In about a month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Why do you want to foster? *</label>
                  <textarea name="why" className="form-textarea" required placeholder="What motivates you to foster a Pom?" value={form.why} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-secondary btn-lg" disabled={sending}>
                  <FaPaw /> {sending ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
