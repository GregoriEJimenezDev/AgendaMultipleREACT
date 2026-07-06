import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import AddContact from './components/AddContact'
import './App.css'

// Unica URL de la API — asi evito repetirla en varios lados (DRY)
const API = 'http://www.raydelto.org/agenda.php'

export default function App() {
  // El estado vive aca y baja por props a los hijos
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)

  // Pedir todos los contactos al iniciar y despues de cada alta
  const traerContactos = async () => {
    setCargando(true)
    setErrorRed(null)
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const datos = await res.json()
      // La API aveces devuelve un objeto en vez de array si hay error
      setContactos(Array.isArray(datos) ? datos : [])
    } catch (e) {
      setErrorRed('No se pudieron cargar los contactos. Verifica tu conexion.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { traerContactos() }, [])

  // Llamada POST — la usa AddContact mediante el callback
  const agregarContacto = async (nuevo) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    })
    if (!res.ok) throw new Error('El servidor rechazo el contacto.')
    // Refresco la lista completa para traer el ID que asigna la API
    await traerContactos()
  }

  return (
    <div className="app">
      <h1>📇 AgendaMultiple</h1>
      <p className="sub">Conectada a <code>raydelto.org/agenda.php</code></p>

      {/* AddContact solo se preocupa del formulario, no sabe de fetch */}
      <AddContact onAgregar={agregarContacto} />

      {/* ContactList solo pinta la tabla, no sabe de estado */}
      <ContactList contactos={contactos} cargando={cargando} error={errorRed} />
    </div>
  )
}
