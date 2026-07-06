import { useState } from 'react'

export default function ContactList({ contacts, onDelete }) {
  const [search, setSearch] = useState('')

  const filtrados = contacts.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.nombre.toLowerCase().includes(q) ||
      c.apellido.toLowerCase().includes(q) ||
      c.telefono.includes(q)
    )
  })

  return (
    <div className="card">
      <h2 className="card-title">📋 Contactos ({contacts.length})</h2>

      {contacts.length > 0 && (
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, apellido o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {filtrados.length === 0 ? (
        <p className="empty-state">
          {contacts.length === 0
            ? 'No hay contactos guardados. Agrega uno nuevo.'
            : 'No se encontraron contactos con ese criterio.'}
        </p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((c, i) => (
                <tr key={c.id}>
                  <td className="num">{i + 1}</td>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.telefono}</td>
                  <td className="action">
                    <button
                      className="btn btn--danger"
                      onClick={() => onDelete(c.id)}
                      title="Eliminar contacto"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
