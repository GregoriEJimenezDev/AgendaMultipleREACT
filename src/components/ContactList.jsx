// Solo pinta la tabla — no tiene estado, no llama a la API, no hace nada raro.
// Recibe todo por props y dibuja.

export default function ContactList({ contactos, cargando, error }) {
  // Mientras carga
  if (cargando) {
    return (
      <div className="panel">
        <h2>📋 Contactos guardados</h2>
        <p className="estado">Cargando lista...</p>
      </div>
    )
  }

  // Si el fetch fallo
  if (error) {
    return (
      <div className="panel">
        <h2>📋 Contactos guardados</h2>
        <p className="msg msg-mal">{error}</p>
      </div>
    )
  }

  return (
    <div className="panel">
      <h2>📋 Contactos guardados ({contactos.length})</h2>

      {contactos.length === 0 ? (
        <p className="vacio">Todavia no hay contactos. Agrega el primero.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c, i) => (
              <tr key={i}>
                <td className="num">{i + 1}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
