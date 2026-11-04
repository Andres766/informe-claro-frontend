import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Check, FileText, FileUp, FileX2, Languages, LoaderCircle, Lock, Stethoscope } from 'lucide-react'
import { api } from '../api'
import { partible } from '../estados'
import { useIdioma } from '../i18n/contexto'

const TOTAL_PASOS = 3

export default function SubirInforme({ onListo, motor }) {
  const { t } = useIdioma()
  const pasos = t('subir.pasos')
  const [archivo, setArchivo] = useState(null)
  const [arrastrando, setArrastrando] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [paso, setPaso] = useState(0)
  const [lento, setLento] = useState(false)
  const [error, setError] = useState('')
  const input = useRef(null)

  useEffect(() => {
    if (!cargando) return
    const avance = setInterval(() => setPaso((p) => Math.min(p + 1, TOTAL_PASOS - 1)), 1600)
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
      setError(t('subir.noEsPdf'))
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
        <h1>{t('subir.titulo')}</h1>
        <p className="entrada">{t('subir.entrada')}</p>

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
                <button type="button" className="boton-texto" onClick={() => input.current.click()}>{t('subir.cambiar')}</button>
              </div>
            ) : (
              <>
                <FileUp size={34} aria-hidden="true" />
                <p><strong>{t('subir.arrastra')}</strong><br />{t('subir.buscaEn')}</p>
                <button type="button" className="boton boton--secundario" onClick={() => input.current.click()}>
                  {t('subir.buscar')}
                </button>
              </>
            )}
          </div>
        )}

        {cargando && (
          <div className="proceso" role="status" aria-live="polite">
            <ol>
              {pasos.map((texto, i) => (
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
              <p className="nota">{t('subir.lento')}</p>
            )}
          </div>
        )}

        {error && <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>}

        {!cargando && (
          <>
            <p className="subir__idioma"><Languages size={18} aria-hidden="true" /> {t('subir.idiomaExplicacion')}</p>
            <button className="boton boton--ancho" disabled={!archivo} onClick={enviar}>
              {t('subir.explicar')}
            </button>
          </>
        )}
      </div>

      <ul className="promesas subir__promesas">
        <li><FileX2 size={20} aria-hidden="true" /> {t('subir.sinPdf')}</li>
        <li><Lock size={20} aria-hidden="true" /> {t('subir.datosOcultos')}</li>
        <li><Stethoscope size={20} aria-hidden="true" /> {t('subir.noDiagnostico')}</li>
      </ul>
      {motor && <p className="motor">{t('subir.motor', { motor })}</p>}
    </section>
  )
}
