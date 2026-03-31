import { useState, useEffect } from 'react'
import { FaWifi } from 'react-icons/fa'
import './OfflineBanner.css'

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const goOffline = () => setIsOffline(true)
    const goOnline = () => setIsOffline(false)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="offline-banner">
      <FaWifi /> You&apos;re offline — some features may be limited.
    </div>
  )
}
