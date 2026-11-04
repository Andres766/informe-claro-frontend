import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Check, FileText, FileUp, FileX2, LoaderCircle, Lock, Stethoscope } from 'lucide-react'
import { api } from '../api'
import { partible } from '../estados'

const PASOS = ['Leer el PDF', 'Encontrar los valores', 'Preparar la explicación']

export default function SubirInforme({ onListo, motor }) {
  const [archivo, setArchivo] = useState(null)
  const [arrastrando, setArrastrando] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [paso, setPaso] = useState(0)
  const [lento, setLento] = useState(false)
  const [error, setError] = useState('')
  const input = useRef(null)

  useEffect(() => {
    if (!cargando) return
    const avance = setInterval(() => setPaso((p) => Math.min(p + 1, PASOS.length - 1)), 1600)
    const espera = setTimeout(() => setLento(true), 9000)
    return () => {
      clearInterval(avance)
      clearTimeout(espera)
    }
  }, [cargando])

  const elegir = (f) => {
    setError('')
    if (!f) return
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Ese archivo no es un PDF. Elige el PDF que te entregó el laboratorio.')
      return
    }
    setArchivo(f)
  }

  const enviar = async () => {
    setCargando(true)
    setError('')
    setPaso(0)
    setLento(false)
    try {
      onListo(await api.subirInforme(archivo))
    } catch (e) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="subir">
      <div className="hoja subir__hoja">
        <h1>Sube tu informe de laboratorio</h1>
        <p className="entrada">
          Usa el PDF que te entregó el laboratorio. En menos de un minuto tendrás tu hoja para la cita.
        </p>

        {!cargando && (
          <div
            className={`zona ${arrastrando ? 'zona--activa' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setArrastrando(true) }}
            onDragLeave={() => setArrastrando(false)}
            onDrop={(e) => { e.preventDefault(); setArrastrando(false); elegir(e.dataTransfer.files[0]) }}
          >
            <input ref={input} id="archivo" type="file" accept="application/pdf,.pdf" className="sr-only"
              onChange={(e) => elegir(e.target.files[0])} />
            {archivo ? (
              <div className="zona__archivo">
                <FileText size={28} aria-hidden="true" />
                <span>
                  <strong>{partible(archivo.name)}</strong>
                  <small>{(archivo.size / 1024).toFixed(0)} KB</small>
                </span>
                <button type="button" className="boton-texto" onClick={() => input.current.click()}>Cambiar</button>
              </div>
            ) : (
              <>
                <FileUp size={34} aria-hidden="true" />
                <p><strong>Arrastra el PDF aquí</strong><br />o búscalo en tu celular o computador</p>
                <button type="button" className="boton boton--secundario" onClick={() => input.current.click()}>
                  Buscar archivo
                </button>
              </>
            )}
          </div>
        )}

        {cargando && (
          <div className="proceso" role="status" aria-live="polite">
            <ol>
              {PASOS.map((texto, i) => (
                <li key={texto} className={i < paso ? 'hecho' : i === paso ? 'actual' : ''}>
                  {i < paso
                    ? <Check size={20} aria-hidden="true" />
                    : i === paso
                      ? <LoaderCircle className="girando" size={20} aria-hidden="true" />
                      : <span className="proceso__punto" aria-hidden="true" />}
                  {texto}
                </li>
              ))}
            </ol>
            {lento && (
              <p className="nota">
                El servidor gratuito puede tardar hasta un minuto en despertar. No cierres esta página.
              </p>
            )}
          </div>
        )}

        {error && <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>}

        {!cargando && (
          <button className="boton boton--ancho" disabled={!archivo} onClick={enviar}>
            Explicar mi informe
          </button>
        )}
      </div>

      <ul className="promesas subir__promesas">
        <li><FileX2 size={20} aria-hidden="true" /> No guardamos tu PDF, solo los valores y su explicación.</li>
        <li><Lock size={20} aria-hidden="true" /> Tus datos personales se ocultan antes de procesar el texto.</li>
        <li><Stethoscope size={20} aria-hidden="true" /> No es un diagnóstico: la decisión clínica es de tu médico.</li>
      </ul>
      {motor && <p className="motor">Motor de interpretación: {motor}</p>}
    </section>
  )
}
