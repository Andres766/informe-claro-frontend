import { useEffect, useState } from 'react'
import { AlertCircle, LoaderCircle, ShieldCheck } from 'lucide-react'
import { api } from '../api'
import { useIdioma } from '../i18n/contexto'

// Un motor cuyo nombre menciona "reglas" es el respaldo sin IA; los demás son modelos de Gemini.
const esReglas = (motor) => /reglas/i.test(motor)

// "2025-12" -> fecha del primer día del mes (en UTC para que no se corra de mes por la zona horaria).
const fechaDeMes = (mes) => {
  const [anio, numero] = mes.split('-').map(Number)
  return new Date(Date.UTC(anio, numero - 1, 1))
}

export default function PanelAdmin() {
  const { t, locale } = useIdioma()
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.estadisticasAdmin().then(setDatos).catch((e) => setError(e.message))
  }, [])

  // --- Formatos según el idioma de la interfaz ---
  const numero = (n) => new Intl.NumberFormat(locale).format(n)
  const porcentaje = (parte, total) =>
    new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(total ? parte / total : 0)
  // Segundos con un decimal solo cuando son pocos (9,5 s); si no, enteros (98 s).
  const segundos = (ms) => {
    const s = (ms ?? 0) / 1000
    const cifra = new Intl.NumberFormat(locale, { maximumFractionDigits: s < 10 ? 1 : 0 }).format(s)
    return t('admin.segundos', { n: cifra })
  }
  const fecha = (iso) => new Date(iso).toLocaleDateString(locale, { dateStyle: 'medium' })
  const fechaHora = (iso) => new Date(iso).toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' })
  const nombreIdioma = (codigo) => {
    try {
      return new Intl.DisplayNames(locale, { type: 'language' }).of(codigo)
    } catch {
      return codigo
    }
  }

  return (
    <section className="panel-admin">
      <header className="panel-admin__cabecera">
        <h1>{t('admin.titulo')}</h1>
        <p className="entrada">{t('admin.entrada')}</p>
        <p className="aviso"><ShieldCheck size={18} aria-hidden="true" /> {t('admin.privacidad')}</p>
      </header>

      {error && <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>}
      {datos === null && !error && (
        <p className="conectando" role="status"><LoaderCircle className="girando" size={22} aria-hidden="true" /> {t('admin.cargando')}</p>
      )}

      {datos && (
        <>
          <Cifras datos={datos} t={t} numero={numero} porcentaje={porcentaje} segundos={segundos} nombreIdioma={nombreIdioma} />

          <div className="panel-admin__rejilla">
            <Motores datos={datos} t={t} numero={numero} porcentaje={porcentaje} segundos={segundos} />
            <Meses meses={datos.informes_por_mes} t={t} numero={numero} locale={locale} />
            <ValoresFuera valores={datos.valores_fuera_de_rango} t={t} numero={numero} />
            <Fallos fallos={datos.fallos_recientes} t={t} fechaHora={fechaHora} />
            <Usuarios usuarios={datos.usuarios} t={t} numero={numero} fecha={fecha} />
          </div>
        </>
      )}
    </section>
  )
}

// Cifras grandes del encabezado: una por ficha, con una línea de detalle.
function Cifras({ datos, t, numero, porcentaje, segundos, nombreIdioma }) {
  const { totales } = datos
  // Tiempo promedio solo de las respuestas de la IA (las reglas responden al instante y lo bajarían).
  const conIa = datos.motores.filter((m) => !esReglas(m.motor))
  const respondidasIa = conIa.reduce((suma, m) => suma + m.interpretaciones, 0)
  const promedioIa = respondidasIa
    ? conIa.reduce((suma, m) => suma + m.duracion_promedio_ms * m.interpretaciones, 0) / respondidasIa
    : null
  const idiomas = (datos.informes_por_idioma ?? [])
    .map((i) => t('admin.porIdioma', { n: numero(i.informes), idioma: nombreIdioma(i.idioma) }))
    .join(' · ')

  const fichas = [
    { etiqueta: t('admin.usuarios'), valor: numero(totales.usuarios), detalle: t('admin.administradores', { n: numero(totales.administradores) }) },
    { etiqueta: t('admin.informes'), valor: numero(totales.informes), detalle: idiomas },
    { etiqueta: t('admin.valores'), valor: numero(totales.valores), detalle: t('admin.valoresFuera', { n: numero(totales.fuera_de_rango) }) },
    { etiqueta: t('admin.fueraDeRango'), valor: porcentaje(totales.fuera_de_rango, totales.valores), detalle: t('admin.fueraDetalle') },
    { etiqueta: t('admin.tiempo'), valor: promedioIa === null ? '—' : segundos(promedioIa), detalle: t('admin.tiempoDetalle', { n: numero(respondidasIa) }) },
  ]

  return (
    <dl className="fichas" aria-label={t('admin.cifras')}>
      {fichas.map((f) => (
        <div key={f.etiqueta} className="ficha">
          <dt>{f.etiqueta}</dt>
          <dd className="ficha__valor">{f.valor}</dd>
          <dd className="ficha__detalle">{f.detalle}</dd>
        </div>
      ))}
    </dl>
  )
}

// Encabezado común de cada tarjeta del panel.
function Tarjeta({ id, titulo, entrada, ancha, children }) {
  return (
    <section className={`hoja tarjeta ${ancha ? 'tarjeta--ancha' : ''}`} aria-labelledby={id}>
      <h2 id={id}>{titulo}</h2>
      {entrada && <p className="tarjeta__entrada">{entrada}</p>}
      {children}
    </section>
  )
}

// Qué motor explicó los informes: barras de participación, IA en tinta y reglas en gris.
function Motores({ datos, t, numero, porcentaje, segundos }) {
  const { motores, interpretaciones } = datos
  const total = interpretaciones.total || motores.reduce((suma, m) => suma + m.interpretaciones, 0)

  return (
    <Tarjeta id="admin-motor" titulo={t('admin.motorTitulo')} entrada={t('admin.motorEntrada')}>
      {motores.length === 0 && <p className="tarjeta__vacio">{t('admin.sinMotores')}</p>}
      {motores.length > 0 && (
        <ul className="barras">
          {motores.map((m) => {
            const reglas = esReglas(m.motor)
            const parte = porcentaje(m.interpretaciones, total)
            return (
              <li key={m.motor} className="barras__item">
                <span className="barras__fila">
                  <span className="barras__nombre">{m.motor}</span>
                  <span className="barras__cifra cifra">{numero(m.interpretaciones)}</span>
                </span>
                <span className="barras__pista" role="img"
                  aria-label={t('admin.motorAria', { motor: m.motor, n: numero(m.interpretaciones), parte })}>
                  <span className={`barras__relleno ${reglas ? 'barras__relleno--reglas' : ''}`}
                    style={{ '--parte': total ? m.interpretaciones / total : 0 }} />
                </span>
                <span className="barras__meta">
                  <span className={`etiqueta-motor ${reglas ? 'etiqueta-motor--reglas' : ''}`}>
                    {!reglas ? t('admin.tipoIa') : /^demo/i.test(m.motor) ? t('admin.tipoDemo') : t('admin.tipoReglas')}
                  </span>
                  {' · '}{t('admin.motorDetalle', { parte, s: segundos(m.duracion_promedio_ms) })}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      <dl className="motor-resumen">
        <div>
          <dt>{t('admin.respaldo')}</dt>
          <dd><span className="cifra">{numero(interpretaciones.respaldo)}</span> {t('admin.deTotal', { total: numero(total) })}</dd>
        </div>
        <div>
          <dt>{t('admin.guardrails')}</dt>
          <dd><span className="cifra">{numero(interpretaciones.guardrails_activados)}</span> {t('admin.guardrailsDetalle')}</dd>
        </div>
      </dl>
    </Tarjeta>
  )
}

// Columnas por mes. En una tarjeta angosta (celular) se vuelven filas horizontales.
function Meses({ meses = [], t, numero, locale }) {
  const maximo = Math.max(1, ...meses.map((m) => m.informes))
  const mesCorto = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' })
  const mesLargo = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
  // Cifra visible solo en el mes más alto y en el último; las demás aparecen al pasar el puntero.
  const destacados = new Set([meses.findIndex((m) => m.informes === maximo), meses.length - 1])

  return (
    <Tarjeta id="admin-meses" titulo={t('admin.mesesTitulo')} entrada={t('admin.mesesEntrada')}>
      {meses.length === 0 && <p className="tarjeta__vacio">{t('admin.sinMeses')}</p>}
      {meses.length > 0 && (
        <div className="grafica-meses">
          <ol className="columnas" style={{ '--columnas': meses.length }}>
            {meses.map((m, i) => {
              const fecha = fechaDeMes(m.mes)
              const nuevoAnio = i === 0 || fecha.getUTCMonth() === 0
              const etiqueta = t('admin.mesAria', { mes: mesLargo.format(fecha), n: numero(m.informes) })
              return (
                <li key={m.mes} className={`columnas__item ${destacados.has(i) ? 'columnas__item--rotulado' : ''}`}
                  tabIndex={0} title={etiqueta} aria-label={etiqueta}>
                  <span className="columnas__zona" aria-hidden="true">
                    <span className="columnas__barra" style={{ '--alto': m.informes / maximo }}>
                      <span className="columnas__cifra cifra">{numero(m.informes)}</span>
                    </span>
                  </span>
                  <span className="columnas__mes" aria-hidden="true">
                    {mesCorto.format(fecha).replace('.', '')}
                    <span className={`columnas__anio ${nuevoAnio ? '' : 'columnas__anio--repetido'}`}>{fecha.getUTCFullYear()}</span>
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </Tarjeta>
  )
}

// Exámenes que más veces quedaron fuera de rango (violeta, como los sellos de la hoja).
function ValoresFuera({ valores = [], t, numero }) {
  return (
    <Tarjeta id="admin-valores" titulo={t('admin.valoresTitulo')} entrada={t('admin.valoresEntrada')}>
      {valores.length === 0 && <p className="tarjeta__vacio">{t('admin.sinValores')}</p>}
      {valores.length > 0 && (
        <ul className="barras">
          {valores.map((v) => (
            <li key={v.nombre_valor} className="barras__item">
              <span className="barras__fila">
                <span className="barras__nombre">{v.nombre_valor}</span>
                <span className="barras__cifra">{t('admin.valoresFila', { n: numero(v.fuera_de_rango), total: numero(v.total) })}</span>
              </span>
              <span className="barras__pista" role="img"
                aria-label={t('admin.valoresAria', { nombre: v.nombre_valor, n: numero(v.fuera_de_rango), total: numero(v.total) })}>
                <span className="barras__relleno barras__relleno--fuera" style={{ '--parte': v.total ? v.fuera_de_rango / v.total : 0 }} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  )
}

// Últimas veces que la IA falló: la causa se recorta a dos líneas y completa en el `title`.
function Fallos({ fallos = [], t, fechaHora }) {
  return (
    <Tarjeta id="admin-fallos" titulo={t('admin.fallosTitulo')} entrada={t('admin.fallosEntrada')}>
      {fallos.length === 0 && <p className="tarjeta__vacio">{t('admin.sinFallos')}</p>}
      {fallos.length > 0 && (
        <ul className="fallos">
          {fallos.map((f, i) => (
            <li key={`${f.fecha}-${i}`}>
              <time dateTime={f.fecha}>{fechaHora(f.fecha)}</time>
              <p className="fallos__causa" title={f.causa}>{f.causa}</p>
            </li>
          ))}
        </ul>
      )}
    </Tarjeta>
  )
}

// Cuentas registradas. En el celular cada fila se apila para no desbordar la página.
function Usuarios({ usuarios = [], t, numero, fecha }) {
  return (
    <Tarjeta id="admin-usuarios" titulo={t('admin.usuariosTitulo')} entrada={t('admin.usuariosEntrada')} ancha>
      <div className="tabla-usuarios__marco">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th scope="col">{t('admin.colNombre')}</th>
              <th scope="col">{t('admin.colEmail')}</th>
              <th scope="col">{t('admin.colRol')}</th>
              <th scope="col" className="tabla-usuarios__num">{t('admin.colInformes')}</th>
              <th scope="col">{t('admin.colUltimo')}</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => {
              const admin = u.rol === 'admin'
              return (
                <tr key={u.id}>
                  <th scope="row" className="tabla-usuarios__nombre">{u.nombre}</th>
                  <td className="tabla-usuarios__email">{u.email}</td>
                  <td className="tabla-usuarios__rol">
                    <span className={`rol ${admin ? 'rol--admin' : ''}`}>{admin ? t('admin.rolAdmin') : t('admin.rolUsuario')}</span>
                  </td>
                  <td className="tabla-usuarios__num cifra" data-etiqueta={t('admin.colInformes')}>{numero(u.informes)}</td>
                  <td className="tabla-usuarios__fecha" data-etiqueta={t('admin.colUltimo')}>
                    {u.ultimo_informe ? <time dateTime={u.ultimo_informe}>{fecha(u.ultimo_informe)}</time> : t('admin.sinFecha')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Tarjeta>
  )
}
