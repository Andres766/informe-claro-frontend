// Tema visual: 'sistema' sigue al dispositivo; 'claro' y 'oscuro' lo fijan.
// index.html aplica el tema guardado antes de pintar para evitar un destello.
const CLAVE = 'informeclaro_tema'
export const TEMAS = ['sistema', 'claro', 'oscuro']
const ATRIBUTO = { claro: 'light', oscuro: 'dark' }

export function leerTema() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (TEMAS.includes(guardado)) return guardado
  } catch {
    // sin almacenamiento se usa el del sistema
  }
  return 'sistema'
}

export function aplicarTema(tema) {
  const raiz = document.documentElement
  if (ATRIBUTO[tema]) raiz.dataset.theme = ATRIBUTO[tema]
  else delete raiz.dataset.theme
  try {
    localStorage.setItem(CLAVE, tema)
  } catch {
    // la elección dura mientras la pestaña esté abierta
  }
}

export const siguienteTema = (tema) => TEMAS[(TEMAS.indexOf(tema) + 1) % TEMAS.length]
