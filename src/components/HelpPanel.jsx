import { useState } from 'react'

const FAQ = [
  {
    q: '¿Cómo agrego un contacto?',
    a: 'Completa los campos Nombre, Apellido y Teléfono en el formulario y presiona "Guardar contacto".',
  },
  {
    q: '¿Dónde se guardan mis contactos?',
    a: 'Los datos persisten automáticamente en el localStorage del navegador. No se perderán al recargar la página.',
  },
  {
    q: '¿Cómo elimino un contacto?',
    a: 'Haz clic en el botón ✕ de la fila correspondiente en la tabla de contactos.',
  },
  {
    q: '¿Cómo busco un contacto?',
    a: 'Usa el campo de búsqueda sobre la tabla. Filtra por nombre, apellido o teléfono en tiempo real.',
  },
  {
    q: '¿Qué tecnología usa esta app?',
    a: 'React 19 con Vite, componentes funcionales, Hooks (useState, useEffect), y CSS vanilla.',
  },
]

export default function HelpPanel() {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className="help">
      <button className="help__toggle btn btn--ghost" onClick={() => setOpen(!open)}>
        {open ? '▼' : '▶'} Ayuda &mdash; Preguntas frecuentes
      </button>

      {open && (
        <div className="help__body">
          {FAQ.map((item, i) => (
            <div key={i} className="help__item">
              <button
                className="help__question"
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                {item.q}
                <span className="help__arrow">{activeIdx === i ? '▴' : '▾'}</span>
              </button>
              {activeIdx === i && <p className="help__answer">{item.a}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
