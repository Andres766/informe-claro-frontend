import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fuentes alojadas en el proyecto (funcionan sin conexión en la PWA).
// Atkinson Hyperlegible fue diseñada para lectores con baja visión.
import '@fontsource/atkinson-hyperlegible-next/400.css'
import '@fontsource/atkinson-hyperlegible-next/600.css'
import '@fontsource/atkinson-hyperlegible-next/800.css'
import '@fontsource/atkinson-hyperlegible-mono/500.css'
import '@fontsource/atkinson-hyperlegible-mono/700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))
}
