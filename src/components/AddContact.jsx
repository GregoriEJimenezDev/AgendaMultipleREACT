import { useState } from 'react'

export default function AddContact({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const mostrarMsg = (texto, tipo) => {
    setMensaje({ texto, tipo })
    setTimeout(() => setMensaje(null), 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      mostrarMsg('Todos los campos son obligatorios.', 'error')
      return
    }

    setEnviando(true)
    try {
      await onAgregar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
      })
      setNombre('')
      setApellido('')
      setTelefono('')
      mostrarMsg('Contacto agregado correctamente.', 'success')
    } catch (e) {
      mostrarMsg('Error al agregar: ' + e.message, 'error')
    } finally {
      setEnviando(false)
    }
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
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td className="lbl">Apellido:</td>
                <td>
                  <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td className="lbl">Teléfono:</td>
                <td>
                  <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <button type="submit" className="btn btn-submit" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Agregar Contacto'}
            </button>
          </div>
          {mensaje && (
            <div className={`msg show msg-${mensaje.tipo}`}>{mensaje.texto}</div>
          )}
        </form>
      </div>
    </fieldset>
  )
}
