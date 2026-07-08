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
              Sobre esta aplicación
            </h6>
            <p className="text-secondary mb-2">
              Esta es una agenda telefónica construida con <strong>React</strong> que se conecta
              al servicio REST de{' '}
              <a href="https://raydelto.org" target="_blank" rel="noreferrer">raydelto.org</a>.
            </p>

            <h6 className="text-uppercase fw-bold mb-2 mt-3" style={{ fontSize: '12px' }}>
              API
            </h6>
            <p className="text-secondary mb-1">
              <code>GET https://www.raydelto.org/agenda.php</code> — obtiene todos los contactos.
            </p>
            <p className="text-secondary mb-1">
              <code>POST https://www.raydelto.org/agenda.php</code> — agrega un contacto (JSON: nombre, apellido, telefono).
            </p>

            <h6 className="text-uppercase fw-bold mb-2 mt-3" style={{ fontSize: '12px' }}>
              Modo oscuro
            </h6>
            <p className="text-secondary mb-0">
              Presiona <strong>🌙 / ☀️</strong> en el menú superior para alternar. Tu preferencia se guarda automáticamente.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
