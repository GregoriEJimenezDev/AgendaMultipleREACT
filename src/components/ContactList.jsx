export default function ContactList({ contactos, cargando, error, onRefresh }) {
  return (
    <fieldset>
      <legend>Contactos guardados</legend>
      <div className="fieldset-body">
        <div className="panel-top">
          <button type="button" className="btn btn-refresh" onClick={onRefresh}>
            Actualizar lista
          </button>
          <span className="record-count">
            {contactos.length} fila{contactos.length !== 1 ? 's' : ''} en total.
          </span>
        </div>

        <table className="data-table">
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
                <td colSpan={4} className="table-status">Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="table-status" style={{ color: '#903030' }}>{error}</td>
              </tr>
            ) : contactos.length === 0 ? (
              <tr>
                <td colSpan={4} className="table-status">No hay registros.</td>
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
    </fieldset>
  )
}
