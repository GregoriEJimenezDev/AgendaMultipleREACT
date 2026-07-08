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
    <div className="card shadow-sm mb-3">
      <div className="card-header text-white fw-semibold text-uppercase" style={{ fontSize: '12px', background: 'var(--primario)', borderBottom: '2px solid var(--primario-oscuro)' }}>
        ✚ Agregar nuevo contacto
      </div>
      <div className="card-body p-3">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-2">
            <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12px', width: '80px' }}>Nombre:</label>
            <input type="text" className="form-control form-control-sm" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12px', width: '80px' }}>Apellido:</label>
            <input type="text" className="form-control form-control-sm" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary" style={{ fontSize: '12px', width: '80px' }}>Teléfono:</label>
            <input type="text" className="form-control form-control-sm" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-sm fw-semibold text-white" style={{ background: 'var(--primario)', borderColor: 'var(--primario-oscuro)' }} disabled={enviando}>
            {enviando ? '⏳ Enviando...' : '💾 Agregar Contacto'}
          </button>
          {mensaje && (
            <div className={`mt-2 alert alert-${mensaje.tipo === 'error' ? 'danger' : 'success'} py-2 px-3 mb-0`} style={{ fontSize: '12px' }}>
              {mensaje.texto}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
