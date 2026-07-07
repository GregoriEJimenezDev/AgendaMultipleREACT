import { useState, useEffect } from 'react'
import useTheme from './hooks/useTheme'
import Header from './components/Header'
import Footer from './components/Footer'
import HelpPanel from './components/HelpPanel'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
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

  return (
    <div className="app">
      <Header tema={tema} onToggleTema={toggleTema} />

      <main className="contenedor">
        <HelpPanel />

        <AddContact onAgregar={agregarContacto} />

        <ContactList
          contactos={contactos}
          cargando={cargando}
          error={errorRed}
          onRefresh={traerContactos}
        />
      </main>

      <Footer />
    </div>
  )
}
