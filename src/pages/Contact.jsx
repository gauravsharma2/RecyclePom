import { useState } from 'react'
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF,
  FaInstagram, FaGlobe, FaPaperPlane, FaCheckCircle,
} from 'react-icons/fa'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <section className="page-hero page-hero--contact">
        <div className="container">
          <h1 className="page-hero__title">Contact Us</h1>
          <p className="page-hero__subtitle">
            Have a question, want to volunteer, or know a Pom in need? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                We&apos;re a volunteer-run organization, so response times may
                vary. For urgent surrender or rescue situations, please call us
                directly.
              </p>

              <div className="contact-info__items">
                <div className="contact-info__item">
                  <FaEnvelope />
                  <div>
                    <strong>Email</strong>
                    <span>info@recycledpoms.org</span>
                  </div>
                </div>
                <div className="contact-info__item">
                  <FaPhone />
                  <div>
                    <strong>Phone</strong>
                    <span>(555) POM-LOVE</span>
                  </div>
                </div>
                <div className="contact-info__item">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Service Area</strong>
                    <span>Dallas-Fort Worth, TX &amp; surrounding areas</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h3>Follow Us</h3>
                <div className="contact-social__links">
                  <a href="https://www.facebook.com/RecycledPoms/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/recycledpoms/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="https://recycledpoms.org/" target="_blank" rel="noopener noreferrer" aria-label="Website">
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-area">
              {submitted ? (
                <div className="contact-success card">
                  <FaCheckCircle className="contact-success__icon" />
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. We&apos;ll get back to you as
                    soon as possible. In the meantime, follow us on social media!
                  </p>
                </div>
              ) : (
                <form className="contact-form card" onSubmit={handleSubmit}>
                  <h2>Send a Message</h2>
                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input type="text" name="name" className="form-input" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" required value={form.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select name="subject" className="form-select" value={form.subject} onChange={handleChange}>
                      <option value="">Select a topic...</option>
                      <option value="adoption">Adoption Inquiry</option>
                      <option value="foster">Foster Inquiry</option>
                      <option value="surrender">Surrender a Pom</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="donation">Donation Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea name="message" className="form-textarea" required placeholder="How can we help?" value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg contact-submit">
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
