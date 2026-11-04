import { useEffect, useState } from 'react'
import { Languages, Monitor, Moon, Sun } from 'lucide-react'
import { useIdioma } from '../i18n/contexto'
import { actualizarColorBarra, aplicarTema, leerTema, siguienteTema } from '../tema'

const ICONO_TEMA = { sistema: Monitor, claro: Sun, oscuro: Moon }

// Controles de preferencias en la barra superior: idioma y tema.
export default function Preferencias() {
  const { idioma, setIdioma, t } = useIdioma()
  const [tema, setTema] = useState(leerTema)

  useEffect(() => { aplicarTema(tema) }, [tema])

  // En modo automático, la barra del navegador sigue los cambios del sistema.
  useEffect(() => {
    if (tema !== 'sistema' || !window.matchMedia) return
    const consulta = window.matchMedia('(prefers-color-scheme: dark)')
    const alCambiar = () => actualizarColorBarra('sistema')
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [tema])

  const IconoTema = ICONO_TEMA[tema]
  const etiquetaTema = t('preferencias.tema', { tema: t(`preferencias.temas.${tema}`) })

  return (
    <div className="preferencias">
      <button type="button" className="boton-preferencia" onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
        aria-label={t('preferencias.cambiarIdioma')} title={t('preferencias.cambiarIdioma')}
        lang={idioma === 'es' ? 'en' : 'es'}>
        <Languages size={18} aria-hidden="true" />
        <span>{t('preferencias.otroIdioma')}</span>
      </button>
      <button type="button" className="boton-preferencia" onClick={() => setTema(siguienteTema(tema))}
        aria-label={etiquetaTema} title={etiquetaTema}>
        <IconoTema size={18} aria-hidden="true" />
      </button>
    </div>
  )
}
