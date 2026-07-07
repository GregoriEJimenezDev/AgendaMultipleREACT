export default function ThemeToggle({ tema, onToggle }) {
  return (
    <button
      type="button"
      className="tema-btn"
      onClick={onToggle}
      title={tema === 'claro' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      aria-label="Alternar modo claro/oscuro"
    >
      {tema === 'claro' ? '🌙' : '☀️'}
    </button>
  )
}
