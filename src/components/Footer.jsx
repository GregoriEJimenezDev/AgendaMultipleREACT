import { version as ReactVersion } from 'react'

export default function Footer() {
  return (
    <footer className="pie">
      <span className="pie-react">
        <span className="pie-atomo" aria-hidden="true">
          <i></i><i></i><i></i>
        </span>
        React v{ReactVersion}
      </span>
      <span className="pie-sep">·</span>
      Agenda de Contactos
    </footer>
  )
}
