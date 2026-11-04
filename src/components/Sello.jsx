import { ArrowDown, ArrowUp, Check, Minus } from 'lucide-react'

// Marca de estado de cada valor, como el sello de caucho del consultorio.
// El estado lo decide el backend comparando números; aquí solo se muestra.
const SELLOS = {
  alto: { texto: 'Por encima', Icono: ArrowUp, etiqueta: 'Por encima del rango de referencia' },
  bajo: { texto: 'Por debajo', Icono: ArrowDown, etiqueta: 'Por debajo del rango de referencia' },
  normal: { texto: 'En rango', Icono: Check, etiqueta: 'Dentro del rango de referencia' },
  sin_rango: { texto: 'Sin rango', Icono: Minus, etiqueta: 'El informe no trae rango de referencia' },
}

export default function Sello({ estado, orden = 0 }) {
  const { texto, Icono, etiqueta } = SELLOS[estado] ?? SELLOS.sin_rango
  return (
    <span className={`sello sello--${estado}`} style={{ '--orden': orden }} role="img" aria-label={etiqueta}>
      <Icono size={15} strokeWidth={2.5} aria-hidden="true" />
      {texto}
    </span>
  )
}
