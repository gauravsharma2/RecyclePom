import { useState } from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'
import DogCard from '../components/DogCard'
import { dogs } from '../data'
import './Adopt.css'

const genderOptions = ['All', 'Male', 'Female']
const statusOptions = ['All', 'available', 'pending']

export default function Adopt() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(search.toLowerCase())
    const matchesGender = gender === 'All' || dog.gender === gender
    const matchesStatus = status === 'All' || dog.status === status
    return matchesSearch && matchesGender && matchesStatus
  })

  return (
    <div className="adopt-page">
      <section className="page-hero page-hero--adopt">
        <div className="container">
          <h1 className="page-hero__title">Adopt a Pomeranian</h1>
          <p className="page-hero__subtitle">
            Each of these beautiful Poms is looking for their forever family.
            Could that be you?
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="adopt-filters">
            <div className="adopt-filters__search">
              <FaSearch className="adopt-filters__search-icon" />
              <input
                type="text"
                placeholder="Search by name..."
                className="form-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="adopt-filters__group">
              <FaFilter className="adopt-filters__filter-icon" />
              <select
                className="form-select"
                value={gender}
                onChange={e => setGender(e.target.value)}
              >
                {genderOptions.map(g => (
                  <option key={g} value={g}>
                    {g === 'All' ? 'All Genders' : g}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Status' : s === 'available' ? 'Available' : 'Pending'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="adopt-empty">
              <p>No dogs match your search. Try adjusting your filters!</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filtered.map(dog => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          )}

          <div className="adopt-info">
            <h3>Adoption Process</h3>
            <ol>
              <li>Browse our available Poms and find your match.</li>
              <li>Fill out an adoption application (we&apos;ll review within 48 hours).</li>
              <li>Schedule a meet &amp; greet with your potential new family member.</li>
              <li>Home check visit by one of our volunteers.</li>
              <li>Finalize adoption and welcome your Pom home!</li>
            </ol>
            <p className="adopt-info__note">
              Adoption fees range from $250-$500 and cover spay/neuter, vaccinations,
              microchip, and veterinary care. All fees go directly back into rescue operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
