import React, { useState, useEffect } from 'react'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import HelpPanel from './components/HelpPanel'
import './App.css'

const STORAGE_KEY = 'agenda_contactos'

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    try { return saved ? JSON.parse(saved) : [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  const addContact = (nuevo) => {
    setContacts((prev) => [...prev, { ...nuevo, id: crypto.randomUUID() }])
  }

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1><span className="icon-react">⚛️</span> AgendaMultiple</h1>
        <p className="subtitle">Gestión de contactos con React + Vite</p>
      </header>

      <main className="app-main">
        <div className="grid">
          <div className="grid-col grid-col--form">
            <AddContact onAdd={addContact} />
          </div>
          <div className="grid-col grid-col--list">
            <ContactList contacts={contacts} onDelete={deleteContact} />
          </div>
        </div>

        <HelpPanel />
      </main>

      <footer className="app-footer">
        <p>AgendaMultiple &copy; 2026 &mdash; React v{React.version}</p>
        <p className="tech">Vite &middot; Hooks &middot; localStorage &middot; GitHub Pages</p>
      </footer>
    </div>
  )
}
