import { FaHeart, FaPaw } from 'react-icons/fa'
import './DogCard.css'

export default function DogCard({ dog }) {
  const statusLabel = {
    available: 'Available',
    pending: 'Adoption Pending',
    adopted: 'Adopted',
  }

  return (
    <div className="dog-card card">
      <div className="dog-card__image-wrap">
        <img src={dog.image} alt={dog.name} className="dog-card__image" loading="lazy" />
        <span className={`badge badge-${dog.status} dog-card__badge`}>
          {statusLabel[dog.status]}
        </span>
        <button className="dog-card__fav" aria-label="Favorite">
          <FaHeart />
        </button>
      </div>

      <div className="dog-card__body">
        <h3 className="dog-card__name">{dog.name}</h3>
        <div className="dog-card__meta">
          <span>{dog.age}</span>
          <span className="dog-card__dot">•</span>
          <span>{dog.gender}</span>
          <span className="dog-card__dot">•</span>
          <span>{dog.weight}</span>
        </div>
        <p className="dog-card__desc">{dog.description}</p>
        <div className="dog-card__traits">
          {dog.personality.map(trait => (
            <span key={trait} className="dog-card__trait">{trait}</span>
          ))}
        </div>
        <button className="btn btn-primary dog-card__btn">
          <FaPaw /> Meet {dog.name}
        </button>
      </div>
    </div>
  )
}
