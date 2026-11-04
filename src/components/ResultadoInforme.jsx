import { useEffect, useRef, useState } from 'react'
import { Check, Copy, FilePlus2, Info, Languages, Printer, Scissors } from 'lucide-react'
import Sello from './Sello'
import { fueraDeRango, partible } from '../estados'
import { useIdioma } from '../i18n/contexto'

const num = (s) => parseFloat(String(s).replace(',', '.'))

// Escala impresa sobre el renglón: el rango del laboratorio entre dos marcas
// y el valor como un punto de esfero.
function Escala({ valor, rango, estado }) {
  const v = num(valor)
  let min, max
  const entre = rango.match(/^([\d.,]+)\s*[-–]\s*([\d.,]+)$/)
  const menor = rango.match(/^[<≤]=?\s*([\d.,]+)$/)
  const mayor = rango.match(/^[>≥]=?\s*([\d.,]+)$/)
  if (entre) [min, max] = [num(entre[1]), num(entre[2])]
  else if (menor) [min, max] = [0, num(menor[1])]
  else if (mayor) [min, max] = [num(mayor[1]), num(mayor[1]) * 2]
  if (Number.isNaN(v) || min === undefined || max <= min) return null

  const margen = (max - min) * 0.5
  const inicio = Math.max(0, min - margen)
  const fin = max + margen
  const pos = (x) => Math.min(100, Math.max(0, ((x - inicio) / (fin - inicio)) * 100))

  return (
    <span className={`escala escala--${estado}`} aria-hidden="true">
      <span className="escala__rango" style={{ left: `${pos(min)}%`, width: `${pos(max) - pos(min)}%` }} />
      <span className="escala__marca" style={{ left: `${pos(v)}%` }} />
    </span>
  )
}

// "> 40" -> "más de 40" / "more than 40"; "70 - 100" -> "70 a 100" / "70 to 100"
function rangoEnPalabras(rango, t) {
  if (!rango) return t('resultado.rango.sin')
  return `${t('resultado.rango.ref')} ` + rango
    .replace(/^\s*[<≤]=?\s*/, `${t('resultado.rango.menosDe')} `)
    .replace(/^\s*[>≥]=?\s*/, `${t('resultado.rango.masDe')} `)
    .replace(/\s*[-–]\s*/, ` ${t('resultado.rango.a')} `)
}

export default function ResultadoInforme({ informe, onNuevo }) {
  const { t, idioma, locale } = useIdioma()
  const [filtro, setFiltro] = useState('todos')
  const [copiado, setCopiado] = useState(false)
  const [desprendibleVisible, setDesprendibleVisible] = useState(false)
  const [cabeceraVisible, setCabeceraVisible] = useState(true)
  const desprendible = useRef(null)
  const cabecera = useRef(null)

  const total = informe.valores.length
  const fuera = informe.valores.filter((v) => fueraDeRango(v.estado))
  const visibles = filtro === 'fuera' ? fuera : informe.valores
  const fecha = new Date(informe.fecha_carga).toLocaleDateString(locale, { dateStyle: 'long' })
  const preguntas = informe.preguntas.length

  // En el celular, la barra inferior aparece cuando ya bajaste por la lista
  // y se oculta cuando el desprendible completo está a la vista.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const obsDesprendible = new IntersectionObserver(([e]) => setDesprendibleVisible(e.isIntersecting), { threshold: 0.15 })
    const obsCabecera = new IntersectionObserver(([e]) => setCabeceraVisible(e.isIntersecting))
    if (desprendible.current) obsDesprendible.observe(desprendible.current)
    if (cabecera.current) obsCabecera.observe(cabecera.current)
    return () => {
      obsDesprendible.disconnect()
      obsCabecera.disconnect()
    }
  }, [])

  const copiarPreguntas = async () => {
    const texto = `${t('resultado.textoCopiado')}\n\n`
      + informe.preguntas.map((p, i) => `${i + 1}. ${p.texto_pregunta}`).join('\n')
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      setCopiado(false)
    }
  }

  const imprimir = () => {
    setFiltro('todos')
    setTimeout(() => window.print(), 50)
  }

  return (
    <section className="resultado">
      <article className="hoja hoja--rayada resultado__hoja">
        <header className="resultado__cabecera" ref={cabecera}>
          <h1>
            {fuera.length
              ? t('resultado.tituloFuera', { n: fuera.length, total })
              : t('resultado.tituloOk', { total })}
          </h1>
          <p className="resultado__meta">{partible(informe.nombre_archivo)} · <span className="sin-corte">{fecha}</span></p>
          <p className="aviso"><Info size={18} aria-hidden="true" /> {informe.aviso}</p>
          {informe.idioma && informe.idioma !== idioma && (
            <p className="aviso" lang={informe.idioma}><Languages size={18} aria-hidden="true" /> {t('resultado.otroIdioma')}</p>
          )}
        </header>

        <div className="pestanas pestanas--filtro" role="group" aria-label={t('resultado.filtrar')}>
          <button className={filtro === 'todos' ? 'activa' : ''} aria-pressed={filtro === 'todos'}
            onClick={() => setFiltro('todos')}>
            {t('resultado.todos')} <span className="cifra">{total}</span>
          </button>
          <button className={filtro === 'fuera' ? 'activa' : ''} aria-pressed={filtro === 'fuera'}
            onClick={() => setFiltro('fuera')}>
            {t('resultado.conversar')} <span className="cifra">{fuera.length}</span>
          </button>
        </div>

        <h2 className="sr-only">{t('resultado.tusValores')}</h2>
        <ul className="valores" lang={informe.idioma || undefined}>
          {visibles.map((v, i) => (
            <li key={v.id} className={`valor valor--${v.estado}`}>
              <span className="valor__nombre">{v.nombre_valor}</span>
              <span className="valor__cifra"><span className="valor__numero">{v.valor}</span><small>{v.unidad}</small></span>
              <span className="valor__rango">{rangoEnPalabras(v.rango_referencia, t)}</span>
              <span className="valor__sello"><Sello estado={v.estado} orden={i} /></span>
              {v.rango_referencia && <Escala valor={v.valor} rango={v.rango_referencia} estado={v.estado} />}
              <p className="valor__frase">{v.explicacion_ia}</p>
            </li>
          ))}
        </ul>
        {visibles.length === 0 && (
          <p className="vacio">{t('resultado.vacio')}</p>
        )}

        <section className="resultado__resumen" aria-labelledby="titulo-resumen">
          <h2 id="titulo-resumen">{t('resultado.resumen')}</h2>
          <p lang={informe.idioma || undefined}>{informe.resumen}</p>
        </section>
        <button className="boton boton--secundario resultado__nuevo" onClick={onNuevo}>
          <FilePlus2 size={19} aria-hidden="true" /> {t('resultado.nuevo')}
        </button>
        <p className="resultado__motor">{t('resultado.motor', { motor: informe.motor })}</p>
      </article>

      <aside className="desprendible" id="desprendible" ref={desprendible} aria-labelledby="titulo-desprendible">
        <div className="desprendible__corte" aria-hidden="true"><Scissors size={18} /></div>
        <h2 id="titulo-desprendible">{t('resultado.paraCita')}</h2>
        <p className="desprendible__sub">{t('resultado.preguntasSub')}</p>
        <ol lang={informe.idioma || undefined}>
          {informe.preguntas.map((p, i) => (
            <li key={p.id}><span className="cifra" aria-hidden="true">{i + 1}</span>{p.texto_pregunta}</li>
          ))}
        </ol>
        <div className="desprendible__acciones">
          <button className="boton" onClick={copiarPreguntas}>
            {copiado ? <Check size={19} aria-hidden="true" /> : <Copy size={19} aria-hidden="true" />}
            {copiado ? t('resultado.copiadas') : t('resultado.copiar')}
          </button>
          <button className="boton boton--secundario" onClick={imprimir}>
            <Printer size={19} aria-hidden="true" /> {t('resultado.imprimir')}
          </button>
        </div>
        <p className="sr-only" role="status">{copiado ? t('resultado.copiadasEstado') : ''}</p>
      </aside>

      <div className={`barra-cita ${desprendibleVisible || cabeceraVisible ? 'barra-cita--oculta' : ''}`}>
        <a className="barra-cita__ir" href="#desprendible" aria-label={t('resultado.irAPreguntas', { n: preguntas })}>
          <Scissors size={18} aria-hidden="true" />
          <span>{t('resultado.barraPreguntas', { n: preguntas })}</span>
        </a>
        <button className="boton" onClick={copiarPreguntas}>
          {copiado ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copiado ? t('resultado.copiadasCorto') : t('resultado.copiarCorto')}
        </button>
      </div>
    </section>
  )
}
