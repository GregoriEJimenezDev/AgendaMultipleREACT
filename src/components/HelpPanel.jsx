import { useState } from 'react'

export default function HelpPanel() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
      >
        {abierto ? '▼' : '▶'} Ayuda
      </button>

      {abierto && (
        <div className="card mt-2 shadow-sm">
          <div className="card-body" style={{ fontSize: '13px' }}>
            <h6 className="text-uppercase fw-bold mb-2" style={{ fontSize: '12px' }}>
              Cómo usar
            </h6>
            <ul className="text-secondary mb-0" style={{ paddingLeft: '18px' }}>
              <li>Llena los campos <strong>Nombre</strong>, <strong>Apellido</strong> y <strong>Teléfono</strong> y presiona <em>Agregar Contacto</em>.</li>
              <li>Los contactos se guardan en el servidor y aparecen en la tabla de abajo.</li>
              <li>Usa el botón <strong>✎ Editar</strong> en cualquier fila para modificar los datos.</li>
              <li>Usa el botón <em>Actualizar</em> para refrescar la lista desde el servidor.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
