import { useCallback, useEffect, useMemo, useState } from 'react'
import { DICCIONARIOS, IdiomaContexto, LOCALES, guardarIdioma, idiomaInicial, traducir } from './contexto'

export default function IdiomaProvider({ children, alCambiar }) {
  const [idioma, setIdioma] = useState(idiomaInicial)

  useEffect(() => {
    document.documentElement.lang = idioma
    guardarIdioma(idioma)
    alCambiar?.(idioma)
  }, [idioma, alCambiar])

  const t = useCallback(
    (clave, datos) => traducir(DICCIONARIOS[idioma], clave, datos) ?? traducir(DICCIONARIOS.es, clave, datos) ?? clave,
    [idioma],
  )

  const valor = useMemo(() => ({ idioma, setIdioma, t, locale: LOCALES[idioma] }), [idioma, t])
  return <IdiomaContexto.Provider value={valor}>{children}</IdiomaContexto.Provider>
}
