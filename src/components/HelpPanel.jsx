import { useState } from 'react'

export default function HelpPanel() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className={`ayuda ${abierto ? 'ayuda--abierto' : ''}`}>
      <button
        type="button"
        className="ayuda-toggle"
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
      >
        {abierto ? '▼' : '▶'} Ayuda
      </button>

      {abierto && (
        <div className="ayuda-contenido">
          <h4>Sobre esta aplicación</h4>
          <p>
            Esta es una agenda telefónica construida con <strong>React</strong> que se conecta
            al servicio REST de <a href="https://raydelto.org" target="_blank" rel="noreferrer">raydelto.org</a>.
          </p>

          <h4>Cómo usar</h4>
          <ul>
            <li>Llena los campos <strong>Nombre</strong>, <strong>Apellido</strong> y <strong>Teléfono</strong> y presiona <em>Agregar Contacto</em>.</li>
            <li>Los contactos se guardan en el servidor y aparecen en la tabla de abajo.</li>
            <li>Usa el botón <em>Actualizar</em> para refrescar la lista desde el servidor.</li>
          </ul>

          <h4>API</h4>
          <p>
            <code>GET https://www.raydelto.org/agenda.php</code> — obtiene todos los contactos.<br />
            <code>POST https://www.raydelto.org/agenda.php</code> — agrega un contacto (JSON: nombre, apellido, telefono).
          </p>

          <h4>Modo oscuro</h4>
          <p>
            Presiona el botón <strong>🌙 / ☀️</strong> en el menú superior para alternar entre modo claro y oscuro.
            Tu preferencia se guarda automáticamente.
          </p>
        </div>
      )}
    </div>
  )
}
