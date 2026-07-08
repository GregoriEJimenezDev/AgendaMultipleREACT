import { useState } from 'react'

export default function ContactList({ contactos, cargando, error, onRefresh, onEditar }) {
  const [editando, setEditando] = useState(-1)
  const [editForm, setEditForm] = useState({ nombre: '', apellido: '', telefono: '' })
  const [guardando, setGuardando] = useState(false)

  const iniciarEdicion = (i) => {
    setEditando(i)
    setEditForm({ ...contactos[i] })
  }

  const cancelarEdicion = () => {
    setEditando(-1)
    setEditForm({ nombre: '', apellido: '', telefono: '' })
  }

  const guardarEdicion = async () => {
    if (!editForm.nombre.trim() || !editForm.apellido.trim() || !editForm.telefono.trim()) return
    setGuardando(true)
    try {
      await onEditar(editando, editForm)
      setEditando(-1)
      setEditForm({ nombre: '', apellido: '', telefono: '' })
    } catch {
      alert('Error al guardar la edición.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header text-white fw-semibold text-uppercase" style={{ fontSize: '12px', background: 'var(--primario)', borderBottom: '2px solid var(--primario-oscuro)' }}>
        📋 Contactos guardados
      </div>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '12px', color: 'var(--texto-muted)' }}>
          <span>{contactos.length} registro{contactos.length !== 1 ? 's' : ''}</span>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onRefresh}>
            ↻ Actualizar
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0" style={{ fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th style={{ width: '100px' }}></th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={5} className="text-center text-secondary py-4" style={{ fontSize: '13px' }}>
                    Cargando contactos...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-4" style={{ fontSize: '13px', color: 'var(--error-texto)' }}>
                    {error}
                  </td>
                </tr>
              ) : contactos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-secondary py-4" style={{ fontSize: '13px' }}>
                    No hay contactos guardados.
                  </td>
                </tr>
              ) : (
                contactos.map((c, i) => (
                  <tr key={i}>
                    <td className="text-center text-secondary">{i + 1}</td>
                    {editando === i ? (
                      <>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editForm.nombre}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, nombre: e.target.value }))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editForm.apellido}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, apellido: e.target.value }))}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editForm.telefono}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, telefono: e.target.value }))}
                          />
                        </td>
                        <td className="text-nowrap">
                          <button
                            type="button"
                            className="btn btn-sm btn-success me-1"
                            onClick={guardarEdicion}
                            disabled={guardando}
                          >
                            {guardando ? '...' : '💾'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={cancelarEdicion}
                          >
                            ✕
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{c.nombre}</td>
                        <td>{c.apellido}</td>
                        <td>{c.telefono}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => iniciarEdicion(i)}
                          >
                            ✎ Editar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
