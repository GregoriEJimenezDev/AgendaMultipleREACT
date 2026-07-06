import { useState } from 'react'

// Todo lo que hace: mostrar un formulario, validar que no llegue vacio,
// y llamar a onAgregar para que el padre (App) haga el POST.
// No sabe de fetch ni de APIs.

export default function AddContact({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono, setTelefono] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    // Lo minimo que pide el enunciado: que no esten vacios
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setMensaje({ texto: 'Los tres campos son obligatorios.', tipo: 'mal' })
      return
    }

    setEnviando(true)
    try {
      // Le devuelvo el control al padre, el hace el POST y refresca
      await onAgregar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim(),
      })
      // Si onAgregar no lanzo error, limpio el form
      setNombre('')
      setApellido('')
      setTelefono('')
      setMensaje({ texto: 'Contacto guardado.', tipo: 'bien' })
    } catch (e) {
      setMensaje({ texto: e.message, tipo: 'mal' })
    } finally {
      setEnviando(false)
    }
    // El mensaje se borra solo a los 4 segundos
    setTimeout(() => setMensaje(null), 4000)
  }

  return (
    <div className="panel">
      <h2>✚ Agregar contacto</h2>
      <form onSubmit={handleSubmit} autoComplete="off">

        <div className="fila">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan"
          />
        </div>

        <div className="fila">
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ej: Perez"
          />
        </div>

        <div className="fila">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 809-555-1234"
          />
        </div>

        <button type="submit" className="btn btn-prim" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Guardar contacto'}
        </button>

        {mensaje && (
          <div className={`msg msg-${mensaje.tipo}`}>{mensaje.texto}</div>
        )}
      </form>
    </div>
  )
}
