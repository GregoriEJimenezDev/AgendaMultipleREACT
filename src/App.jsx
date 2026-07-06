import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import './App.css'

const API = 'http://www.raydelto.org/agenda.php'

export default function App() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)

  // Tema: arranca de lo que el usuario haya elegido antes, sino claro
  const [tema, setTema] = useState(() => localStorage.getItem('agenda_tema') || 'claro')

  const traerContactos = async () => {
    setCargando(true)
    setErrorRed(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const datos = await res.json()
      setContactos(Array.isArray(datos) ? datos : [])
    } catch (e) {
      setErrorRed('No se pudieron cargar los contactos. Verifica tu conexion.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { traerContactos() }, [])

  // Cuando cambia el tema lo guardo para la proxima visita
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

  const toggleTema = () => setTema(tema === 'claro' ? 'oscuro' : 'claro')

  return (
    // La clase "tema-oscuro" se activa o no, y el CSS hace el resto
    <div className={`app ${tema === 'oscuro' ? 'tema-oscuro' : ''}`}>
      <div className="encabezado">
        <div>
          <h1>📇 AgendaMultiple</h1>
          <p className="sub">Conectada a <code>raydelto.org/agenda.php</code></p>
        </div>
        <button className="btn btn-tema" onClick={toggleTema} title="Cambiar tema">
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>
      </div>

      <AddContact onAgregar={agregarContacto} />
      <ContactList contactos={contactos} cargando={cargando} error={errorRed} />
    </div>
  )
}
