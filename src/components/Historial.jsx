import { useEffect, useState } from 'react'
import { AlertCircle, ChevronRight, FilePlus2, LoaderCircle, Trash2 } from 'lucide-react'
import { api } from '../api'
import { partible } from '../estados'

export default function Historial({ onAbrir, onNuevo }) {
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
    if (!confirm(`¿Eliminar «${informe.nombre_archivo}» de tus hojas? No se puede deshacer.`)) return
    try {
      await api.eliminarInforme(informe.id)
      cargar()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section className="historial">
      <h1>Mis hojas</h1>
      <p className="entrada">Los informes que has subido, del más reciente al más antiguo.</p>

      {error && <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>}
      {informes === null && !error && (
        <p className="conectando" role="status"><LoaderCircle className="girando" size={22} aria-hidden="true" /> Cargando…</p>
      )}

      {informes?.length === 0 && (
        <div className="hoja vacio-historial">
          <h2>Todavía no tienes hojas</h2>
          <p>Cuando subas tu primer informe de laboratorio, aparecerá aquí para que lo vuelvas a consultar.</p>
          <button className="boton" onClick={onNuevo}><FilePlus2 size={19} aria-hidden="true" /> Subir mi primer informe</button>
        </div>
      )}

      {informes?.length > 0 && (
        <ul className="hoja pila">
          {informes.map((i) => (
            <li key={i.id} className="pila__item">
              <button className="pila__abrir" onClick={() => abrir(i.id)}>
                <span className="pila__nombre">{partible(i.nombre_archivo)}</span>
                <span className="pila__meta">
                  {new Date(i.fecha_carga).toLocaleDateString('es-CO', { dateStyle: 'long' })}
                  {' · '}<span className="cifra">{i.total_valores}</span> valores
                </span>
                <span className={`pila__estado ${i.fuera_de_rango ? 'pila__estado--fuera' : ''}`}>
                  {i.fuera_de_rango
                    ? <><span className="cifra">{i.fuera_de_rango}</span> para conversar</>
                    : 'Todo en rango'}
                </span>
                <ChevronRight className="pila__flecha" size={22} aria-hidden="true" />
              </button>
              <button className="boton-eliminar" onClick={() => eliminar(i)}
                aria-label={`Eliminar ${i.nombre_archivo}`}>
                <Trash2 size={18} aria-hidden="true" /> <span>Eliminar</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
