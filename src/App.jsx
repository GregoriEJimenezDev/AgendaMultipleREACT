import { useState, useEffect, version as ReactVersion } from 'react'
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
      setErrorRed('No se pudieron cargar los contactos desde el servidor.')
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
      <div className="top">
        <div className="logo">📇</div>
        <h1>Agenda de Contactos</h1>
      </div>
      <div className="subbar">
        <a href="https://raydelto.org" target="_blank" rel="noreferrer">raydelto.org</a> / agenda.php / contactos
        &nbsp;·&nbsp; Hecho con React
      </div>

      <div className="contenedor">
        <AddContact onAgregar={agregarContacto} />
        <ContactList
          contactos={contactos}
          cargando={cargando}
          error={errorRed}
          onRefresh={traerContactos}
        />
      </div>

      <div className="pie">
        Agenda de Contactos &mdash; <code>React v{ReactVersion}</code>
      </div>
    </>
  )
}
