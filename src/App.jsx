import { useState, useEffect } from 'react'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import './App.css'

/*
 * Componente padre App (Agenda):
 * - Mantiene el estado global "contacts" (arreglo de objetos contacto).
 * - Cada contacto tiene: id (unico), nombre, apellido, telefono.
 * - useEffect sincroniza con localStorage para persistencia.
 * - Pasa datos y funciones modificadoras como props a los hijos.
 *
 * Flujo de datos (unidireccional):
 *    Estado  ──────────────────────────►  Props (hacia abajo)
 *    App (contacts)   ───►  ContactList
 *                       ───►  AddContact
 *
 *    Eventos  ◄────────────────────────  Callbacks (hacia arriba)
 *    App ◄── onDeleteContact  ──  ContactList
 *    App ◄── onAddContact    ──  AddContact
 */

const STORAGE_KEY = 'agenda_contactos'

export default function App() {
  /*
   * contacts: arreglo de objetos { id, nombre, apellido, telefono }
   * La inicializacion lazy lee de localStorage (si existe) o arreglo vacio.
   */
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    try {
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  /*
   * useEffect: cada vez que "contacts" cambia, persiste en localStorage.
   * Esto asegura que agregar/eliminar contactos se refleje automaticamente.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  /* Agrega un nuevo contacto al final del arreglo con un id unico */
  const handleAddContact = (nuevoContacto) => {
    setContacts((prev) => [
      ...prev,
      {
        ...nuevoContacto,
        id: Date.now(), // id unico basado en timestamp
      },
    ])
  }

  /* Elimina un contacto por su id */
  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="logo-wrap">
          <div className="logo-placeholder">📇</div>
          <h1>Agenda de Contactos</h1>
        </div>
      </div>
      <div className="nav-bar">
        App: <strong>React</strong> &rsaquo;
        Persistencia: <strong>localStorage</strong>
      </div>

      <div className="container">
        {/*
         * AddContact: formulario controlado.
         * Recibe onAddContact (callback) que App ejecuta para agregar.
         */}
        <AddContact onAddContact={handleAddContact} />

        {/*
         * ContactList: tabla de contactos.
         * Recibe contacts (datos) y onDeleteContact (callback para eliminar).
         */}
        <ContactList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>

      <div className="footer">
        Agenda de Contactos &mdash; React App
      </div>
    </>
  )
}
