import { useState, useEffect } from 'react'
import useTheme from './hooks/useTheme'
import HelpPanel from './components/HelpPanel'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

const API = 'https://www.raydelto.org/agenda.php'

export default function App() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)
  const { tema, toggle: toggleTema } = useTheme()

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

  const editarContacto = async (indice, datos) => {
    const res = await fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
    if (!res.ok) {
      const postRes = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!postRes.ok) throw new Error('No se pudo guardar la edición.')
    }
    await traerContactos()
  }

  return (
    <>
      <div className="top">
        <div className="top-izq">
          <span className="logo">📇</span>
          <h1>Agenda de Contactos</h1>
        </div>
        <ThemeToggle tema={tema} onToggle={toggleTema} />
      </div>

      <div className="subbar">
        <span className="react-pill">⚛️ React</span>
        <span className="sep">·</span>
        Gregori E. Jimenez
        <span className="sep">·</span>
        <a href="https://www.linkedin.com/in/gregori-evangelista-jimenez-5a077932b/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

      <div className="contenedor">
        <HelpPanel />
        <AddContact onAgregar={agregarContacto} />
        <ContactList
          contactos={contactos}
          cargando={cargando}
          error={errorRed}
          onRefresh={traerContactos}
          onEditar={editarContacto}
        />
      </div>

      <div className="pie">
        Gregori E. Jimenez
        <span className="pie-sep">·</span>
        <a href="https://www.linkedin.com/in/gregori-evangelista-jimenez-5a077932b/" target="_blank" rel="noreferrer">LinkedIn</a>
        <span className="pie-sep">·</span>
        <span className="pie-react">⚛️ React</span>
      </div>
    </>
  )
}
