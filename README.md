# AgendaMultiple ⚛️

Agenda de contactos construida con **React 19 + Vite**.

Reactivación del proyecto original HTML/CSS/JavaScript puro, ahora con componentes funcionales, Hooks, y despliegue automático en GitHub Pages.

## Tecnologías

- React 19 con JSX
- Vite 8
- Componentes funcionales + Hooks (`useState`, `useEffect`)
- localStorage para persistencia
- GitHub Actions + GitHub Pages

## Scripts

```bash
npm run dev      # Desarrollo con HMR
npm run build    # Build producción
npm run preview  # Vista previa del build
```

## Estructura

```
src/
├── App.jsx                    # Estado global + persistencia
├── App.css                    # Estilos (dark theme)
├── components/
│   ├── AddContact.jsx         # Formulario controlado
│   ├── ContactList.jsx        # Tabla + búsqueda
│   └── HelpPanel.jsx          # FAQ colapsable
```

## Deploy

El repositorio tiene un workflow de GitHub Actions que construye y despliega automáticamente a GitHub Pages en cada push a `main`.
