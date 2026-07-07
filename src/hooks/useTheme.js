import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'agenda-react-theme'

export default function useTheme() {
  const [tema, setTema] = useState(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado === 'oscuro' || guardado === 'claro') return guardado
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
    localStorage.setItem(STORAGE_KEY, tema)
  }, [tema])

  const toggle = useCallback(() => {
    setTema((prev) => (prev === 'claro' ? 'oscuro' : 'claro'))
  }, [])

  return { tema, toggle }
}
