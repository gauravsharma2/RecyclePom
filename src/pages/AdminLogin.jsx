import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPaw, FaLock, FaUserShield } from 'react-icons/fa'
import './AdminLogin.css'

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const hasPassword = !!localStorage.getItem('rp_admin_hash')
  const [isSetup, setIsSetup] = useState(!hasPassword)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const hash = await hashPassword(password)
    const stored = localStorage.getItem('rp_admin_hash')
    if (hash === stored) {
      sessionStorage.setItem('rp_admin_auth', 'true')
      navigate('/admin')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const handleSetup = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const hash = await hashPassword(password)
    localStorage.setItem('rp_admin_hash', hash)
    sessionStorage.setItem('rp_admin_auth', 'true')
    navigate('/admin')
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__header">
          <FaPaw className="admin-login__logo" />
          <h1>Recycled Poms</h1>
          <p>Admin Panel</p>
        </div>

        {isSetup ? (
          <form onSubmit={handleSetup}>
            <div className="admin-login__icon-wrap">
              <FaUserShield />
            </div>
            <h2>Create Admin Password</h2>
            <p className="admin-login__hint">Set a password to protect the admin panel.</p>
            <div className="admin-login__field">
              <FaLock />
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="admin-login__field">
              <FaLock />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            {error && <p className="admin-login__error">{error}</p>}
            <button type="submit" className="admin-login__btn">Create & Enter Admin</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="admin-login__icon-wrap">
              <FaLock />
            </div>
            <h2>Admin Login</h2>
            <div className="admin-login__field">
              <FaLock />
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="admin-login__error">{error}</p>}
            <button type="submit" className="admin-login__btn">Login</button>
            <button
              type="button"
              className="admin-login__link"
              onClick={() => { setIsSetup(true); setError('') }}
            >
              Reset password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
