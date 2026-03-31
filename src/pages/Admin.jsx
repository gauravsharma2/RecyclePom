import { useState, useRef } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import {
  FaTachometerAlt, FaDog, FaCalendarAlt, FaUsers, FaBookOpen,
  FaChartBar, FaCog, FaSignOutAlt, FaPlus, FaEdit, FaTrash,
  FaTimes, FaSave, FaUpload, FaDownload, FaUndo, FaEye, FaPaw,
  FaBars, FaImage, FaCheck,
} from 'react-icons/fa'
import './Admin.css'

const SECTION_CONFIGS = {
  dogs: {
    label: 'Dogs',
    icon: FaDog,
    nameField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'age', label: 'Age', type: 'text', required: true, placeholder: 'e.g. 3 years' },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
      { name: 'weight', label: 'Weight', type: 'text', required: true, placeholder: 'e.g. 8 lbs' },
      { name: 'status', label: 'Status', type: 'select', options: ['available', 'pending', 'adopted'], required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'personality', label: 'Personality Tags (comma separated)', type: 'tags', placeholder: 'Playful, Sweet, Gentle' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'medicalNotes', label: 'Medical Notes', type: 'textarea' },
    ],
    getEmpty: () => ({ name: '', age: '', gender: 'Male', weight: '', status: 'available', description: '', personality: [], image: '', medicalNotes: '' }),
  },
  events: {
    label: 'Events',
    icon: FaCalendarAlt,
    nameField: 'title',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'text', required: true, placeholder: 'e.g. April 15, 2026' },
      { name: 'time', label: 'Time', type: 'text', required: true, placeholder: '10:00 AM - 4:00 PM' },
      { name: 'location', label: 'Location', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['adoption', 'workshop', 'fundraiser'], required: true },
    ],
    getEmpty: () => ({ title: '', date: '', time: '', location: '', description: '', type: 'adoption' }),
  },
  team: {
    label: 'Team Members',
    icon: FaUsers,
    nameField: 'name',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'e.g. Volunteer Coordinator' },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
    getEmpty: () => ({ name: '', role: '', bio: '', image: '' }),
  },
  stories: {
    label: 'Success Stories',
    icon: FaBookOpen,
    nameField: 'dogName',
    fields: [
      { name: 'dogName', label: 'Dog Name', type: 'text', required: true },
      { name: 'family', label: 'Adopter / Family', type: 'text', required: true },
      { name: 'story', label: 'Story', type: 'textarea', required: true },
      { name: 'image', label: 'Photo', type: 'image' },
    ],
    getEmpty: () => ({ dogName: '', family: '', story: '', image: '' }),
  },
}

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { key: 'dogs', label: 'Dogs', icon: FaDog },
  { key: 'events', label: 'Events', icon: FaCalendarAlt },
  { key: 'team', label: 'Team', icon: FaUsers },
  { key: 'stories', label: 'Stories', icon: FaBookOpen },
  { key: 'stats', label: 'Stats', icon: FaChartBar },
  { key: 'settings', label: 'Settings', icon: FaCog },
]

export default function Admin() {
  const navigate = useNavigate()
  const data = useData()
  const fileInputRef = useRef(null)
  const importInputRef = useRef(null)

  const [section, setSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [isAdding, setIsAdding] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [statsForm, setStatsForm] = useState(null)

  // Auth guard
  if (sessionStorage.getItem('rp_admin_auth') !== 'true') {
    return <Navigate to="/admin/login" replace />
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('rp_admin_auth')
    navigate('/admin/login')
  }

  const handleNavClick = (key) => {
    setSection(key)
    setSidebarOpen(false)
    setEditItem(null)
    setIsAdding(false)
    setDeleteConfirm(null)
  }

  // ===== FORM HELPERS =====
  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (fieldName) => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image too large. Max 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => handleFormChange(fieldName, e.target.result)
    reader.readAsDataURL(file)
  }

  const startAdd = (sectionKey) => {
    const config = SECTION_CONFIGS[sectionKey]
    setFormData(config.getEmpty())
    setIsAdding(true)
    setEditItem(null)
  }

  const startEdit = (item, sectionKey) => {
    const prepared = { ...item }
    // Convert personality array to comma string for editing
    if (sectionKey === 'dogs' && Array.isArray(prepared.personality)) {
      prepared.personality = prepared.personality.join(', ')
    }
    setFormData(prepared)
    setEditItem(item.id || item.name)
    setIsAdding(false)
  }

  const cancelForm = () => {
    setEditItem(null)
    setIsAdding(false)
    setFormData({})
  }

  const handleSave = (sectionKey) => {
    const prepared = { ...formData }
    // Convert personality string back to array
    if (sectionKey === 'dogs' && typeof prepared.personality === 'string') {
      prepared.personality = prepared.personality.split(',').map(s => s.trim()).filter(Boolean)
    }

    if (isAdding) {
      switch (sectionKey) {
        case 'dogs': data.addDog(prepared); break
        case 'events': data.addEvent(prepared); break
        case 'team': data.addTeamMember(prepared); break
        case 'stories': data.addStory(prepared); break
      }
      showToast(`${SECTION_CONFIGS[sectionKey].label.replace(/s$/, '')} added!`)
    } else {
      const id = editItem
      switch (sectionKey) {
        case 'dogs': data.updateDog(id, prepared); break
        case 'events': data.updateEvent(id, prepared); break
        case 'team': data.updateTeamMember(id, prepared); break
        case 'stories': data.updateStory(id, prepared); break
      }
      showToast(`Updated successfully!`)
    }
    cancelForm()
  }

  const handleDelete = (id, sectionKey) => {
    switch (sectionKey) {
      case 'dogs': data.deleteDog(id); break
      case 'events': data.deleteEvent(id); break
      case 'team': data.deleteTeamMember(id); break
      case 'stories': data.deleteStory(id); break
    }
    setDeleteConfirm(null)
    showToast('Deleted.')
  }

  const getItems = (sectionKey) => {
    switch (sectionKey) {
      case 'dogs': return data.dogs
      case 'events': return data.events
      case 'team': return data.teamMembers
      case 'stories': return data.successStories
      default: return []
    }
  }

  // ===== SETTINGS HANDLERS =====
  const handleExport = () => {
    const json = data.exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recycled-poms-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Data exported!')
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        data.importData(ev.target.result)
        showToast('Data imported successfully!')
      } catch {
        showToast('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    data.resetToDefaults()
    showToast('All data reset to defaults.')
  }

  // ===== RENDER HELPERS =====
  const renderField = (field) => {
    const value = formData[field.name] ?? ''

    if (field.type === 'select') {
      return (
        <select
          className="admin-form__input"
          value={value}
          onChange={e => handleFormChange(field.name, e.target.value)}
          required={field.required}
        >
          {field.options.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      )
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          className="admin-form__input admin-form__textarea"
          value={value}
          onChange={e => handleFormChange(field.name, e.target.value)}
          required={field.required}
          placeholder={field.placeholder}
          rows={3}
        />
      )
    }

    if (field.type === 'image') {
      return (
        <div className="admin-form__image-field">
          <input
            type="text"
            className="admin-form__input"
            value={value}
            onChange={e => handleFormChange(field.name, e.target.value)}
            placeholder="Paste image URL or upload below"
          />
          <div className="admin-form__image-actions">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={() => handleImageUpload(field.name)}
            />
            <button
              type="button"
              className="admin-btn admin-btn--small"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaUpload /> Upload Photo
            </button>
            {value && (
              <img src={value} alt="Preview" className="admin-form__image-preview" />
            )}
          </div>
        </div>
      )
    }

    return (
      <input
        type="text"
        className="admin-form__input"
        value={value}
        onChange={e => handleFormChange(field.name, e.target.value)}
        required={field.required}
        placeholder={field.placeholder}
      />
    )
  }

  const renderForm = (sectionKey) => {
    const config = SECTION_CONFIGS[sectionKey]
    return (
      <div className="admin-form">
        <div className="admin-form__header">
          <h3>{isAdding ? `Add New ${config.label.replace(/s$/, '')}` : `Edit ${config.label.replace(/s$/, '')}`}</h3>
          <button className="admin-btn admin-btn--ghost" onClick={cancelForm}><FaTimes /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); handleSave(sectionKey) }}>
          <div className="admin-form__grid">
            {config.fields.map(field => (
              <div key={field.name} className={`admin-form__group ${field.type === 'textarea' || field.type === 'image' ? 'admin-form__group--full' : ''}`}>
                <label className="admin-form__label">
                  {field.label} {field.required && <span className="admin-form__req">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary"><FaSave /> Save</button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={cancelForm}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  const renderItemRow = (item, sectionKey) => {
    const config = SECTION_CONFIGS[sectionKey]
    const id = item.id || item.name
    const isDeleting = deleteConfirm === id

    return (
      <div key={id} className="admin-item">
        {item.image && (
          <img src={item.image} alt="" className="admin-item__thumb" />
        )}
        <div className="admin-item__info">
          <strong>{item[config.nameField]}</strong>
          {sectionKey === 'dogs' && (
            <span className="admin-item__meta">{item.age} · {item.gender} · <span className={`admin-status admin-status--${item.status}`}>{item.status}</span></span>
          )}
          {sectionKey === 'events' && (
            <span className="admin-item__meta">{item.date} · <span className={`admin-tag admin-tag--${item.type}`}>{item.type}</span></span>
          )}
          {sectionKey === 'team' && (
            <span className="admin-item__meta">{item.role}</span>
          )}
          {sectionKey === 'stories' && (
            <span className="admin-item__meta">Adopted by {item.family}</span>
          )}
        </div>
        <div className="admin-item__actions">
          {isDeleting ? (
            <>
              <span className="admin-item__confirm-text">Delete?</span>
              <button className="admin-btn admin-btn--danger admin-btn--small" onClick={() => handleDelete(id, sectionKey)}><FaCheck /> Yes</button>
              <button className="admin-btn admin-btn--small" onClick={() => setDeleteConfirm(null)}><FaTimes /> No</button>
            </>
          ) : (
            <>
              <button className="admin-btn admin-btn--small" onClick={() => startEdit(item, sectionKey)} title="Edit"><FaEdit /></button>
              <button className="admin-btn admin-btn--small admin-btn--danger-ghost" onClick={() => setDeleteConfirm(id)} title="Delete"><FaTrash /></button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ===== SECTION RENDERERS =====
  const renderDashboard = () => (
    <div className="admin-dashboard">
      <h2 className="admin-content__title">Dashboard</h2>
      <div className="admin-stats-grid">
        {[
          { label: 'Dogs', count: data.dogs.length, icon: FaDog, color: '#d4577b' },
          { label: 'Events', count: data.events.length, icon: FaCalendarAlt, color: '#7b5ea7' },
          { label: 'Team', count: data.teamMembers.length, icon: FaUsers, color: '#4a7c6f' },
          { label: 'Stories', count: data.successStories.length, icon: FaBookOpen, color: '#d4a82e' },
        ].map(s => (
          <div key={s.label} className="admin-stat-card" onClick={() => handleNavClick(s.label.toLowerCase())} style={{ cursor: 'pointer' }}>
            <div className="admin-stat-card__icon" style={{ background: `${s.color}15`, color: s.color }}>
              <s.icon />
            </div>
            <div>
              <div className="admin-stat-card__count">{s.count}</div>
              <div className="admin-stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-quick-actions">
        <h3>Quick Actions</h3>
        <div className="admin-quick-actions__grid">
          <button className="admin-btn admin-btn--primary" onClick={() => { handleNavClick('dogs'); setTimeout(() => startAdd('dogs'), 50) }}>
            <FaPlus /> Add Dog
          </button>
          <button className="admin-btn admin-btn--secondary" onClick={() => { handleNavClick('events'); setTimeout(() => startAdd('events'), 50) }}>
            <FaPlus /> Add Event
          </button>
          <button className="admin-btn" onClick={handleExport}>
            <FaDownload /> Export Data
          </button>
          <Link to="/" className="admin-btn admin-btn--outline">
            <FaEye /> View Site
          </Link>
        </div>
      </div>

      <div className="admin-overview">
        <h3>Dogs by Status</h3>
        <div className="admin-overview__bars">
          {['available', 'pending', 'adopted'].map(status => {
            const count = data.dogs.filter(d => d.status === status).length
            const pct = data.dogs.length ? Math.round((count / data.dogs.length) * 100) : 0
            return (
              <div key={status} className="admin-bar">
                <div className="admin-bar__label">
                  <span className={`admin-status admin-status--${status}`}>{status}</span>
                  <span>{count}</span>
                </div>
                <div className="admin-bar__track">
                  <div className={`admin-bar__fill admin-bar__fill--${status}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderDataSection = (sectionKey) => {
    const config = SECTION_CONFIGS[sectionKey]
    const items = getItems(sectionKey)
    const Icon = config.icon

    return (
      <div>
        <div className="admin-content__header">
          <h2 className="admin-content__title"><Icon /> {config.label}</h2>
          <button className="admin-btn admin-btn--primary" onClick={() => startAdd(sectionKey)}>
            <FaPlus /> Add {config.label.replace(/s$/, '').replace(/ie$/, 'y')}
          </button>
        </div>

        {(isAdding || editItem) && renderForm(sectionKey)}

        {items.length === 0 ? (
          <div className="admin-empty">
            <Icon style={{ fontSize: '2rem', opacity: 0.3 }} />
            <p>No {config.label.toLowerCase()} yet. Add your first one!</p>
          </div>
        ) : (
          <div className="admin-items">
            {items.map(item => renderItemRow(item, sectionKey))}
          </div>
        )}
      </div>
    )
  }

  const renderStatsSection = () => {
    const editing = statsForm !== null

    const handleStatChange = (index, field, value) => {
      setStatsForm(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
    }

    const handleStatsSave = () => {
      data.updateStats(statsForm)
      setStatsForm(null)
      showToast('Stats updated!')
    }

    return (
      <div>
        <div className="admin-content__header">
          <h2 className="admin-content__title"><FaChartBar /> Stats</h2>
          {!editing ? (
            <button className="admin-btn admin-btn--primary" onClick={() => setStatsForm([...data.stats])}>
              <FaEdit /> Edit Stats
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={handleStatsSave}><FaSave /> Save</button>
              <button className="admin-btn admin-btn--ghost" onClick={() => setStatsForm(null)}><FaTimes /> Cancel</button>
            </div>
          )}
        </div>

        <div className="admin-stats-edit">
          {(editing ? statsForm : data.stats).map((stat, i) => (
            <div key={i} className="admin-stat-edit-row">
              {editing ? (
                <>
                  <input
                    className="admin-form__input"
                    value={stat.value}
                    onChange={e => handleStatChange(i, 'value', e.target.value)}
                    placeholder="Value (e.g. 500+)"
                  />
                  <input
                    className="admin-form__input"
                    value={stat.label}
                    onChange={e => handleStatChange(i, 'label', e.target.value)}
                    placeholder="Label (e.g. Dogs Rescued)"
                  />
                </>
              ) : (
                <>
                  <span className="admin-stat-edit-row__value">{stat.value}</span>
                  <span className="admin-stat-edit-row__label">{stat.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSettings = () => (
    <div className="admin-settings">
      <h2 className="admin-content__title"><FaCog /> Settings</h2>

      <div className="admin-settings__section">
        <h3>Data Management</h3>
        <div className="admin-settings__actions">
          <button className="admin-btn admin-btn--primary" onClick={handleExport}>
            <FaDownload /> Export All Data (JSON)
          </button>
          <div>
            <input type="file" accept=".json" ref={importInputRef} style={{ display: 'none' }} onChange={handleImport} />
            <button className="admin-btn admin-btn--secondary" onClick={() => importInputRef.current?.click()}>
              <FaUpload /> Import Data (JSON)
            </button>
          </div>
          <button className="admin-btn admin-btn--danger" onClick={() => {
            if (window.confirm('This will reset ALL data to the original defaults. This cannot be undone. Continue?')) {
              handleReset()
            }
          }}>
            <FaUndo /> Reset All to Defaults
          </button>
        </div>
      </div>

      <div className="admin-settings__section">
        <h3>Admin Account</h3>
        <button className="admin-btn" onClick={() => {
          localStorage.removeItem('rp_admin_hash')
          sessionStorage.removeItem('rp_admin_auth')
          navigate('/admin/login')
        }}>
          <FaCog /> Reset Admin Password
        </button>
      </div>

      <div className="admin-settings__section">
        <h3>Service Configuration</h3>
        <p className="admin-settings__hint">
          To enable email notifications, payment processing, and analytics,
          edit the configuration file at <code>src/config.js</code>. See the README for setup instructions.
        </p>
      </div>
    </div>
  )

  return (
    <div className="admin">
      {/* Mobile toggle */}
      <button className="admin-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <FaPaw />
          <span>Recycled Poms</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`admin-sidebar__link ${section === item.key ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => handleNavClick(item.key)}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__link">
            <FaEye />
            <span>View Site</span>
          </Link>
          <button className="admin-sidebar__link admin-sidebar__link--logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {toast && <div className="admin-toast"><FaCheck /> {toast}</div>}

        {section === 'dashboard' && renderDashboard()}
        {section === 'dogs' && renderDataSection('dogs')}
        {section === 'events' && renderDataSection('events')}
        {section === 'team' && renderDataSection('team')}
        {section === 'stories' && renderDataSection('stories')}
        {section === 'stats' && renderStatsSection()}
        {section === 'settings' && renderSettings()}
      </main>
    </div>
  )
}
