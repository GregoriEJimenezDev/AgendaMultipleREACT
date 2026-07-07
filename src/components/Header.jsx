import ThemeToggle from './ThemeToggle'

export default function Header({ tema, onToggleTema }) {
  return (
    <header className="header">
      <div className="header-interior">
        <div className="header-logo">
          <span className="header-icono">📇</span>
          <h1 className="header-titulo">Agenda de Contactos</h1>
        </div>
        <nav className="header-nav">
          <ThemeToggle tema={tema} onToggle={onToggleTema} />
        </nav>
      </div>
      <div className="header-sub">
        <a href="https://raydelto.org" target="_blank" rel="noreferrer">raydelto.org</a>
        <span className="sep">/</span>
        agenda.php
        <span className="sep">/</span>
        contactos
        <span className="sub-badge">⚛️ React</span>
      </div>
    </header>
  )
}
