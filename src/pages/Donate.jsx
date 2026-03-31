import { useState } from 'react'
import { FaHeart, FaPaw, FaStethoscope, FaUtensils, FaBed, FaGift } from 'react-icons/fa'
import './Donate.css'

const amounts = [25, 50, 100, 250, 500]

const impactItems = [
  { icon: <FaStethoscope />, amount: '$25', desc: 'Covers vaccinations for one rescued Pom' },
  { icon: <FaUtensils />, amount: '$50', desc: 'Provides food and supplies for a month' },
  { icon: <FaPaw />, amount: '$100', desc: 'Funds a spay/neuter surgery' },
  { icon: <FaBed />, amount: '$250', desc: 'Covers a full dental cleaning procedure' },
  { icon: <FaHeart />, amount: '$500', desc: 'Sponsors a complete rescue (intake to adoption)' },
  { icon: <FaGift />, amount: 'Any $', desc: 'Every dollar saves a Pomeranian\'s life' },
]

export default function Donate() {
  const [selected, setSelected] = useState(100)
  const [custom, setCustom] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)

  const displayAmount = custom || selected

  return (
    <div className="donate-page">
      <section className="page-hero page-hero--donate">
        <div className="container">
          <h1 className="page-hero__title">Support Our Mission</h1>
          <p className="page-hero__subtitle">
            Your generosity funds veterinary care, food, shelter, and love for
            every Pomeranian in our rescue.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="donate-grid">
            <div className="donate-form-area">
              <div className="donate-card card">
                <h2>Make a Donation</h2>

                <div className="donate-toggle">
                  <button
                    className={`donate-toggle__btn ${!isMonthly ? 'donate-toggle__btn--active' : ''}`}
                    onClick={() => setIsMonthly(false)}
                  >
                    One-Time
                  </button>
                  <button
                    className={`donate-toggle__btn ${isMonthly ? 'donate-toggle__btn--active' : ''}`}
                    onClick={() => setIsMonthly(true)}
                  >
                    Monthly
                  </button>
                </div>

                <div className="donate-amounts">
                  {amounts.map(amt => (
                    <button
                      key={amt}
                      className={`donate-amount ${selected === amt && !custom ? 'donate-amount--active' : ''}`}
                      onClick={() => { setSelected(amt); setCustom('') }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Custom Amount</label>
                  <div className="donate-custom">
                    <span className="donate-custom__symbol">$</span>
                    <input
                      type="number"
                      min="1"
                      className="form-input"
                      placeholder="Other amount"
                      value={custom}
                      onChange={e => { setCustom(e.target.value); setSelected(0) }}
                    />
                  </div>
                </div>

                <div className="donate-summary">
                  <span>Your {isMonthly ? 'monthly' : 'one-time'} donation</span>
                  <strong>${displayAmount}</strong>
                </div>

                <button className="btn btn-primary btn-lg donate-submit">
                  <FaHeart /> Donate ${displayAmount} {isMonthly ? '/ month' : ''}
                </button>

                <p className="donate-secure">
                  All donations are tax-deductible. Recycled Pomeranians is a
                  registered 501(c)(3) nonprofit.
                </p>
              </div>
            </div>

            <div className="donate-impact">
              <h2>Your Impact</h2>
              <p className="donate-impact__intro">
                Every dollar goes directly to saving Pomeranians in need.
                Here&apos;s what your donation can do:
              </p>
              <div className="donate-impact__list">
                {impactItems.map((item, i) => (
                  <div key={i} className="impact-item">
                    <div className="impact-item__icon">{item.icon}</div>
                    <div>
                      <strong>{item.amount}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="donate-other">
            <h3>Other Ways to Give</h3>
            <div className="grid grid-3">
              <div className="donate-other__card card">
                <h4>Amazon Wish List</h4>
                <p>Buy supplies directly for our fosters and rescues.</p>
              </div>
              <div className="donate-other__card card">
                <h4>Sponsor a Pom</h4>
                <p>Cover the full cost of rescuing one specific Pomeranian.</p>
              </div>
              <div className="donate-other__card card">
                <h4>Legacy Giving</h4>
                <p>Include Recycled Pomeranians in your estate planning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
