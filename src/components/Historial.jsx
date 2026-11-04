import { useEffect, useState } from 'react'
import { AlertCircle, ChevronRight, FilePlus2, LoaderCircle, Trash2 } from 'lucide-react'
import { api } from '../api'
import { partible } from '../estados'
import { useIdioma } from '../i18n/contexto'

export default function Historial({ onAbrir, onNuevo }) {
  const { t, locale } = useIdioma()
  const [informes, setInformes] = useState(null)
  const [error, setError] = useState('')

  const cargar = () => api.listarInformes().then(setInformes).catch((e) => setError(e.message))

  useEffect(() => { cargar() }, [])

  const abrir = async (id) => {
    try {
      onAbrir(await api.verInforme(id))
    } catch (e) {
      setError(e.message)
    }
  }

  const eliminar = async (informe) => {
    if (!confirm(t('historial.confirmar', { nombre: informe.nombre_archivo }))) return
    try {
      await api.eliminarInforme(informe.id)
      cargar()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section className="historial">
      <h1>{t('historial.titulo')}</h1>
      <p className="entrada">{t('historial.entrada')}</p>

      {error && <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>}
      {informes === null && !error && (
        <p className="conectando" role="status"><LoaderCircle className="girando" size={22} aria-hidden="true" /> {t('historial.cargando')}</p>
      )}

      {informes?.length === 0 && (
        <div className="hoja vacio-historial">
          <h2>{t('historial.vacioTitulo')}</h2>
          <p>{t('historial.vacioTexto')}</p>
          <button className="boton" onClick={onNuevo}><FilePlus2 size={19} aria-hidden="true" /> {t('historial.primerInforme')}</button>
        </div>
      )}

      {informes?.length > 0 && (
        <ul className="hoja pila">
          {informes.map((i) => (
            <li key={i.id} className="pila__item">
              <button className="pila__abrir" onClick={() => abrir(i.id)}>
                <span className="pila__nombre">{partible(i.nombre_archivo)}</span>
                <span className="pila__meta">
                  {new Date(i.fecha_carga).toLocaleDateString(locale, { dateStyle: 'long' })}
                  {' · '}{t('historial.valores', { n: i.total_valores })}
                </span>
                <span className={`pila__estado ${i.fuera_de_rango ? 'pila__estado--fuera' : ''}`}>
                  {i.fuera_de_rango
                    ? t('historial.paraConversar', { n: i.fuera_de_rango })
                    : t('historial.todoEnRango')}
                </span>
                <ChevronRight className="pila__flecha" size={22} aria-hidden="true" />
              </button>
              <button className="boton-eliminar" onClick={() => eliminar(i)}
                aria-label={t('historial.eliminarAria', { nombre: i.nombre_archivo })}>
                <Trash2 size={18} aria-hidden="true" /> <span>{t('historial.eliminar')}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
