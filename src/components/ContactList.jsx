/*
 * Componente ContactList (Listado de contactos):
 * - Recibe contacts (arreglo) como prop desde App.
 * - Renderiza cada contacto en una fila de tabla usando .map().
 * - Incluye boton "Eliminar" que llama a onDeleteContact(id) hacia arriba.
 *
 * Props recibidas:
 *   contacts            ← datos desde App (estado global)
 *   onDeleteContact(id)  ← callback hacia arriba (App)
 */

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <fieldset>
      <legend>Contactos guardados</legend>
      <div className="fieldset-body">
        <div className="panel-top">
          <span className="record-count">
            {contacts.length} fila{contacts.length !== 1 ? 's' : ''} en total.
          </span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="table-status">
                  No hay contactos. Agrega uno arriba.
                </td>
              </tr>
            ) : (
              /*
               * .map(): itera sobre cada contacto y genera una fila <tr>.
               * La key debe ser unica (usamos el id del contacto).
               */
              contacts.map((contacto, index) => (
                <tr key={contacto.id}>
                  <td>{index + 1}</td>
                  <td>{contacto.nombre}</td>
                  <td>{contacto.apellido}</td>
                  <td>{contacto.telefono}</td>
                  <td>
                    {/*
                     * Boton que dispara el evento hacia arriba:
                     * onDeleteContact(contacto.id) → App → setContacts
                     */}
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => onDeleteContact(contacto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </fieldset>
  )
}
