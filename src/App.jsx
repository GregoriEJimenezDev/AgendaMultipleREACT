import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import './App.css'

const API = 'http://www.raydelto.org/agenda.php'

export default function App() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)

  const [tema, setTema] = useState(() => localStorage.getItem('agenda_tema') || 'claro')

  // Aplica la clase en <html> para que body y todo herede las variables
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
  }, [tema])

  const traerContactos = async () => {
    setCargando(true)
    setErrorRed(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setContactos(Array.isArray(await res.json()) ? await res.json() : [])
    } catch {
      setErrorRed('No se pudieron cargar los contactos. Verifica tu conexion.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { traerContactos() }, [])

  useEffect(() => { localStorage.setItem('agenda_tema', tema) }, [tema])

  const agregarContacto = async (nuevo) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    })
    if (!res.ok) throw new Error('El servidor rechazo el contacto.')
    await traerContactos()
  }

  return (
    <div className="app">
      <div className="encabezado">
        <div>
          <h1>📇 AgendaMultiple</h1>
          <p className="sub">Conectada a <code>raydelto.org/agenda.php</code></p>
        </div>
        <button className="btn btn-tema" onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>
      </div>

      <AddContact onAgregar={agregarContacto} />
      <ContactList contactos={contactos} cargando={cargando} error={errorRed} />
    </div>
  )
}
