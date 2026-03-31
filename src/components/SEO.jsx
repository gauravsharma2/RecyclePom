import { useEffect } from 'react'

const SITE = 'Recycled Pomeranians'
const DEFAULT_DESC = 'Giving Pomeranians a Second Chance at Life. Adopt, Foster, Donate.'
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop'
const BASE_URL = 'https://gauravsharma2.github.io/RecyclePom'

function setMeta(property, content) {
  const selector = property.startsWith('og:') || property.startsWith('twitter:')
    ? `meta[property="${property}"], meta[name="${property}"]`
    : `meta[name="${property}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (property.startsWith('og:')) {
      el.setAttribute('property', property)
    } else {
      el.setAttribute('name', property)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SEO({ title, description, image, path }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Dog Rescue & Adoption`
  const desc = description || DEFAULT_DESC
  const img = image || DEFAULT_IMG
  const url = path ? `${BASE_URL}${path}` : BASE_URL

  useEffect(() => {
    document.title = fullTitle
    setMeta('description', desc)
    setMeta('og:title', fullTitle)
    setMeta('og:description', desc)
    setMeta('og:image', img)
    setMeta('og:url', url)
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    setMeta('twitter:image', img)
  }, [fullTitle, desc, img, url])

  return null
}
