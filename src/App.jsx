import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import './App.css'

const API = 'https://www.raydelto.org/agenda.php'

export default function App() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)

  const traerContactos = async () => {
    setCargando(true)
    setErrorRed(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const datos = await res.json()
      setContactos(Array.isArray(datos) ? datos : [])
    } catch {
      setErrorRed('No se pudieron cargar los contactos.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { traerContactos() }, [])

  const agregarContacto = async (nuevo) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    })
    if (!res.ok) throw new Error('El servidor rechazó el contacto.')
    await traerContactos()
  }

  return (
    <>
      <div className="header">
        <div className="logo-wrap">
          <img src="/logo.png" alt="Logo Agenda" onError={(e) => { e.target.style.display = 'none' }} />
          <h1>Agenda de Contactos</h1>
        </div>
      </div>
      <div className="nav-bar">
        Servidor: <a href="https://raydelto.org" target="_blank" rel="noreferrer">raydelto.org</a> &rsaquo;
        Api: <strong>agenda.php</strong> &rsaquo;
        Tabla: <strong>contactos</strong>
      </div>

      <div className="container">
        <AddContact onAgregar={agregarContacto} />
        <ContactList
          contactos={contactos}
          cargando={cargando}
          error={errorRed}
          onRefresh={traerContactos}
        />
      </div>

      <div className="footer">
        Agenda de Contactos &mdash; React App
      </div>
    </>
  )
}
