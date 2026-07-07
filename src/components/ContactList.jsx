export default function ContactList({ contactos, cargando, error, onRefresh }) {
  return (
    <div className="seccion">
      <div className="seccion-titulo">📋 Contactos guardados</div>
      <div className="seccion-cuerpo">
        <div className="tabla-pie">
          <button type="button" className="btn btn-derecha" onClick={onRefresh}>
            ↻ Actualizar
          </button>
          <span>
            {contactos.length} registro{contactos.length !== 1 ? 's' : ''}
          </span>
        </div>

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
            {cargando ? (
              <tr>
                <td colSpan={4} className="tabla-vacia">Cargando contactos...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="tabla-error">{error}</td>
              </tr>
            ) : contactos.length === 0 ? (
              <tr>
                <td colSpan={4} className="tabla-vacia">No hay contactos guardados.</td>
              </tr>
            ) : (
              contactos.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.telefono}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
