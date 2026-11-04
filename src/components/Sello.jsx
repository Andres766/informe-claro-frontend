import { ArrowDown, ArrowUp, Check, Minus } from 'lucide-react'
import { useIdioma } from '../i18n/contexto'

// Marca de estado de cada valor, como el sello de caucho del consultorio.
// El estado lo decide el backend comparando números; aquí solo se muestra.
const ICONOS = { alto: ArrowUp, bajo: ArrowDown, normal: Check, sin_rango: Minus }

export default function Sello({ estado, orden = 0 }) {
  const { t } = useIdioma()
  const clave = estado in ICONOS ? estado : 'sin_rango'
  const Icono = ICONOS[clave]
  const texto = t(`sello.${clave}`)
  const etiqueta = t(`sello.${clave}Aria`)
  return (
    <span className={`sello sello--${estado}`} style={{ '--orden': orden }} role="img" aria-label={etiqueta}>
      <Icono size={15} strokeWidth={2.5} aria-hidden="true" />
      {texto}
    </span>
  )
}
