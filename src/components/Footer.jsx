import { version as ReactVersion } from 'react'

export default function Footer() {
  return (
    <footer className="pie">
      Agenda de Contactos &mdash; <code>React v{ReactVersion}</code>
    </footer>
  )
}
