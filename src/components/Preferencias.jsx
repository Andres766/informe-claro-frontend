import { Languages } from 'lucide-react'
import { useIdioma } from '../i18n/contexto'

// Controles de preferencias en la barra superior: idioma (y tema, más adelante).
export default function Preferencias() {
  const { idioma, setIdioma, t } = useIdioma()

  return (
    <div className="preferencias">
      <button type="button" className="boton-preferencia" onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
        aria-label={t('preferencias.cambiarIdioma')} title={t('preferencias.cambiarIdioma')}
        lang={idioma === 'es' ? 'en' : 'es'}>
        <Languages size={18} aria-hidden="true" />
        <span>{t('preferencias.otroIdioma')}</span>
      </button>
    </div>
  )
}
