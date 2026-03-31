import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  dogs as defaultDogs,
  successStories as defaultStories,
  events as defaultEvents,
  stats as defaultStats,
  teamMembers as defaultTeam,
} from '../data'

const DataContext = createContext()

const KEYS = {
  dogs: 'rp_dogs',
  events: 'rp_events',
  successStories: 'rp_stories',
  stats: 'rp_stats',
  teamMembers: 'rp_team',
}

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function DataProvider({ children }) {
  const [dogs, setDogs] = useState(() => loadFromStorage(KEYS.dogs, defaultDogs))
  const [events, setEvents] = useState(() => loadFromStorage(KEYS.events, defaultEvents))
  const [successStories, setSuccessStories] = useState(() => loadFromStorage(KEYS.successStories, defaultStories))
  const [stats, setStats] = useState(() => loadFromStorage(KEYS.stats, defaultStats))
  const [teamMembers, setTeamMembers] = useState(() => loadFromStorage(KEYS.teamMembers, defaultTeam))

  // Persist to localStorage
  useEffect(() => { localStorage.setItem(KEYS.dogs, JSON.stringify(dogs)) }, [dogs])
  useEffect(() => { localStorage.setItem(KEYS.events, JSON.stringify(events)) }, [events])
  useEffect(() => { localStorage.setItem(KEYS.successStories, JSON.stringify(successStories)) }, [successStories])
  useEffect(() => { localStorage.setItem(KEYS.stats, JSON.stringify(stats)) }, [stats])
  useEffect(() => { localStorage.setItem(KEYS.teamMembers, JSON.stringify(teamMembers)) }, [teamMembers])

  // ===== DOGS CRUD =====
  const addDog = useCallback((dog) => {
    setDogs(prev => [...prev, { ...dog, id: Date.now() }])
  }, [])
  const updateDog = useCallback((id, updates) => {
    setDogs(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }, [])
  const deleteDog = useCallback((id) => {
    setDogs(prev => prev.filter(d => d.id !== id))
  }, [])

  // ===== EVENTS CRUD =====
  const addEvent = useCallback((event) => {
    setEvents(prev => [...prev, { ...event, id: Date.now() }])
  }, [])
  const updateEvent = useCallback((id, updates) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  }, [])
  const deleteEvent = useCallback((id) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }, [])

  // ===== TEAM CRUD =====
  const addTeamMember = useCallback((member) => {
    setTeamMembers(prev => [...prev, { ...member, id: Date.now() }])
  }, [])
  const updateTeamMember = useCallback((id, updates) => {
    setTeamMembers(prev => prev.map(m => (m.id || m.name) === id ? { ...m, ...updates } : m))
  }, [])
  const deleteTeamMember = useCallback((id) => {
    setTeamMembers(prev => prev.filter(m => (m.id || m.name) !== id))
  }, [])

  // ===== STORIES CRUD =====
  const addStory = useCallback((story) => {
    setSuccessStories(prev => [...prev, { ...story, id: Date.now() }])
  }, [])
  const updateStory = useCallback((id, updates) => {
    setSuccessStories(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])
  const deleteStory = useCallback((id) => {
    setSuccessStories(prev => prev.filter(s => s.id !== id))
  }, [])

  // ===== STATS CRUD =====
  const updateStats = useCallback((newStats) => {
    setStats(newStats)
  }, [])

  // ===== UTILITIES =====
  const resetToDefaults = useCallback(() => {
    setDogs(defaultDogs)
    setEvents(defaultEvents)
    setSuccessStories(defaultStories)
    setStats(defaultStats)
    setTeamMembers(defaultTeam)
  }, [])

  const exportData = useCallback(() => {
    return JSON.stringify({ dogs, events, successStories, stats, teamMembers }, null, 2)
  }, [dogs, events, successStories, stats, teamMembers])

  const importData = useCallback((jsonStr) => {
    const data = JSON.parse(jsonStr)
    if (data.dogs) setDogs(data.dogs)
    if (data.events) setEvents(data.events)
    if (data.successStories) setSuccessStories(data.successStories)
    if (data.stats) setStats(data.stats)
    if (data.teamMembers) setTeamMembers(data.teamMembers)
  }, [])

  return (
    <DataContext.Provider value={{
      dogs, events, successStories, stats, teamMembers,
      addDog, updateDog, deleteDog,
      addEvent, updateEvent, deleteEvent,
      addTeamMember, updateTeamMember, deleteTeamMember,
      addStory, updateStory, deleteStory,
      updateStats,
      resetToDefaults, exportData, importData,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}
