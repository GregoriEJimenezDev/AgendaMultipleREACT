import { useState } from 'react'

export default function AddContact({ onAdd }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', telefono: '' })
  const [msg, setMsg] = useState(null)

  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio.'
    if (!form.apellido.trim()) return 'El apellido es obligatorio.'
    if (!form.telefono.trim()) return 'El teléfono es obligatorio.'
    if (!/^[\d\s\-\+\(\)]{7,15}$/.test(form.telefono.trim()))
      return 'El teléfono debe tener entre 7 y 15 dígitos.'
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validar()
    if (error) { setMsg({ text: error, type: 'error' }); return }

    onAdd({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim(),
    })

    setForm({ nombre: '', apellido: '', telefono: '' })
    setMsg({ text: 'Contacto agregado correctamente.', type: 'success' })
    setTimeout(() => setMsg(null), 3000)
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="card">
      <h2 className="card-title">✚ Nuevo contacto</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        {['nombre', 'apellido', 'telefono'].map((campo) => (
          <div className="field" key={campo}>
            <label htmlFor={campo}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
            <input
              id={campo}
              name={campo}
              type="text"
              value={form[campo]}
              onChange={onChange}
              placeholder={
                campo === 'telefono'
                  ? '809-555-1234'
                  : campo === 'nombre'
                  ? 'Juan'
                  : 'Pérez'
              }
            />
          </div>
        ))}
        <button type="submit" className="btn btn--primary">
          Guardar contacto
        </button>
        {msg && <div className={`msg msg--${msg.type}`}>{msg.text}</div>}
      </form>
    </div>
  )
}
