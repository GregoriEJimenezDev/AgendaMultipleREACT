import { useState } from 'react'

export default function AddContact({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setMensaje({ texto: 'Todos los campos son obligatorios.', tipo: 'error' })
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
      setMensaje({ texto: 'Contacto agregado correctamente.', tipo: 'exito' })
    } catch (e) {
      setMensaje({ texto: 'Error: ' + e.message, tipo: 'error' })
    } finally {
      setEnviando(false)
    }
    setTimeout(() => setMensaje(null), 5000)
  }

  return (
    <div className="seccion">
      <div className="seccion-titulo">✚ Agregar nuevo contacto</div>
      <div className="seccion-cuerpo">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="campos">
            <div className="campo">
              <label>Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="campo">
              <label>Apellido:</label>
              <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="campo">
              <label>Teléfono:</label>
              <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn btn-accion" disabled={enviando}>
            {enviando ? '⏳ Enviando...' : '💾 Agregar Contacto'}
          </button>
          {mensaje && <div className={`msg msg-${mensaje.tipo}`}>{mensaje.texto}</div>}
        </form>
      </div>
    </div>
  )
}
