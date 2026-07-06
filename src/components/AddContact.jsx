import { useState } from 'react'

/*
 * Componente AddContact (Agregar contacto):
 * - Formulario controlado: cada input tiene su estado en useState.
 * - Validacion: todos los campos son obligatorios.
 * - Al enviar, llama a onAddContact (callback recibido de App) y limpia el formulario.
 *
 * Props recibidas:
 *   onAddContact({ nombre, apellido, telefono })  ← callback hacia arriba (App)
 */

export default function AddContact({ onAddContact }) {
  /* Estado local del formulario */
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState(null) // { texto, tipo }

  const handleSubmit = (e) => {
    e.preventDefault()

    /* Validacion basica: todos los campos obligatorios */
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setMensaje({ texto: 'Todos los campos son obligatorios.', tipo: 'error' })
      return
    }

    /*
     * "Lifting state up": en lugar de guardar el contacto aqui,
     * llamamos a onAddContact para que App actualice el estado global.
     */
    onAddContact({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
    })

    /* Limpiar formulario */
    setNombre('')
    setApellido('')
    setTelefono('')
    setMensaje({ texto: 'Contacto agregado correctamente.', tipo: 'success' })

    /* Ocultar mensaje despues de 3 segundos */
    setTimeout(() => setMensaje(null), 3000)
  }

  return (
    <fieldset>
      <legend>Agregar nuevo contacto</legend>
      <div className="fieldset-body">
        <form onSubmit={handleSubmit} autoComplete="off">
          <table className="form-table">
            <tbody>
              <tr>
                <td className="lbl">Nombre:</td>
                <td>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan"
                  />
                </td>
              </tr>
              <tr>
                <td className="lbl">Apellido:</td>
                <td>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Ej: Perez"
                  />
                </td>
              </tr>
              <tr>
                <td className="lbl">Teléfono:</td>
                <td>
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 809-555-1234"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <button type="submit" className="btn btn-submit">
              Agregar Contacto
            </button>
          </div>
          {mensaje && (
            <div className={`msg msg-${mensaje.tipo}`}>{mensaje.texto}</div>
          )}
        </form>
      </div>
    </fieldset>
  )
}
