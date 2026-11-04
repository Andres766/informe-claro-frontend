import { createContext, useContext } from 'react'
import es from './es'
import en from './en'

export const IDIOMAS = ['es', 'en']
export const DICCIONARIOS = { es, en }
export const LOCALES = { es: 'es-CO', en: 'en-US' }
const CLAVE = 'informeclaro_idioma'

// Idioma guardado por la persona o, la primera vez, el del navegador.
export function idiomaInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (IDIOMAS.includes(guardado)) return guardado
  } catch {
    // almacenamiento bloqueado: se usa el del navegador
  }
  return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function guardarIdioma(idioma) {
  try {
    localStorage.setItem(CLAVE, idioma)
  } catch {
    // sin almacenamiento la elección dura mientras la pestaña esté abierta
  }
}

// traducir(es, 'resultado.tituloFuera', { n: 4, total: 12 })
export function traducir(diccionario, clave, datos) {
  const valor = clave.split('.').reduce((nodo, parte) => nodo?.[parte], diccionario)
  if (typeof valor !== 'string') return valor
  return datos ? valor.replace(/\{(\w+)\}/g, (_, k) => (k in datos ? datos[k] : `{${k}}`)) : valor
}

export const IdiomaContexto = createContext(null)
export const useIdioma = () => useContext(IdiomaContexto)
