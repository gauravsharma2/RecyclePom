import { useState, useEffect } from 'react'
import { FaDownload, FaTimes } from 'react-icons/fa'
import './InstallPrompt.css'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    // Check if on iOS Safari (no beforeinstallprompt support)
    const ua = window.navigator.userAgent
    const iosCheck = /iphone|ipad|ipod/i.test(ua)
    const inStandalone = window.navigator.standalone === true
    setIsIos(iosCheck && !inStandalone)

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const dismiss = () => {
    setShowPrompt(false)
    setIsIos(false)
  }

  if (!showPrompt && !isIos) return null

  return (
    <div className="install-prompt">
      <div className="install-prompt__inner">
        <div className="install-prompt__text">
          <strong>Install Recycled Poms</strong>
          {isIos ? (
            <span>
              Tap the share button, then &quot;Add to Home Screen&quot; to install.
            </span>
          ) : (
            <span>Install this app on your device for easy access anytime!</span>
          )}
        </div>
        <div className="install-prompt__actions">
          {!isIos && (
            <button className="btn btn-primary install-prompt__btn" onClick={handleInstall}>
              <FaDownload /> Install
            </button>
          )}
          <button className="install-prompt__close" onClick={dismiss} aria-label="Dismiss">
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  )
}
