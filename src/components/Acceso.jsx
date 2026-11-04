import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, FileX2, Lock, Stethoscope } from 'lucide-react'
import { api, sesion } from '../api'
import { useIdioma } from '../i18n/contexto'
import Sello from './Sello'

export default function Acceso({ onIngreso, aviso }) {
  const { t } = useIdioma()
  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' })
  const [verPassword, setVerPassword] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const esRegistro = modo === 'registro'

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const cambiarModo = (nuevo) => {
    setModo(nuevo)
    setError('')
  }

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      const { access_token, usuario } = esRegistro
        ? await api.registro(datos)
        : await api.login({ email: datos.email, password: datos.password })
      sesion.iniciar(access_token)
      onIngreso(usuario)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="acceso">
      <div className="acceso__intro">
        <h1>{t('acceso.titulo')}</h1>
        <p className="entrada">{t('acceso.entrada')}</p>
      </div>

      <figure className="hoja hoja--rayada acceso__ejemplo">
        <figcaption>{t('acceso.ejemploLeyenda')}</figcaption>
        <div className="valor valor--ejemplo">
          <span className="valor__nombre">{t('acceso.ejemploNombre')}</span>
          <span className="valor__cifra"><span className="valor__numero">36</span><small>mg/dL</small></span>
          <span className="valor__rango">{t('acceso.ejemploRango')}</span>
          <span className="valor__sello"><Sello estado="bajo" /></span>
          <p className="valor__frase">{t('acceso.ejemploFrase')}</p>
        </div>
      </figure>

      <ul className="promesas acceso__promesas">
        <li><Lock size={20} aria-hidden="true" /> {t('acceso.privado')}</li>
        <li><FileX2 size={20} aria-hidden="true" /> {t('acceso.sinPdf')}</li>
        <li><Stethoscope size={20} aria-hidden="true" /> {t('acceso.noDiagnostico')}</li>
      </ul>

      <form className="hoja formulario acceso__form" onSubmit={enviar} noValidate>
        <div className="pestanas" role="tablist" aria-label={t('acceso.pestanas')}>
          <button type="button" role="tab" aria-selected={!esRegistro} className={!esRegistro ? 'activa' : ''}
            onClick={() => cambiarModo('login')}>
            {t('acceso.entrar')}
          </button>
          <button type="button" role="tab" aria-selected={esRegistro} className={esRegistro ? 'activa' : ''}
            onClick={() => cambiarModo('registro')}>
            {t('acceso.crear')}
          </button>
        </div>

        <h2 className="sr-only">{esRegistro ? t('acceso.crear') : t('acceso.entrar')}</h2>
        {aviso && !error && <p className="nota" role="status">{aviso}</p>}

        {esRegistro && (
          <label className="campo">
            <span>{t('acceso.nombre')}</span>
            <input name="nombre" value={datos.nombre} onChange={cambiar} autoComplete="name" required />
          </label>
        )}
        <label className="campo">
          <span>{t('acceso.email')}</span>
          <input name="email" type="email" inputMode="email" value={datos.email} onChange={cambiar}
            autoComplete="email" required />
        </label>
        <label className="campo">
          <span>{t('acceso.password')}</span>
          <span className="campo__con-boton">
            <input name="password" type={verPassword ? 'text' : 'password'} value={datos.password} onChange={cambiar}
              required minLength={esRegistro ? 8 : undefined}
              autoComplete={esRegistro ? 'new-password' : 'current-password'}
              aria-describedby={esRegistro ? 'ayuda-password' : undefined} />
            <button type="button" className="boton-texto" onClick={() => setVerPassword(!verPassword)}
              aria-label={verPassword ? t('acceso.ocultarPassword') : t('acceso.mostrarPassword')} aria-pressed={verPassword}>
              {verPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
              {verPassword ? t('acceso.ocultar') : t('acceso.mostrar')}
            </button>
          </span>
          {esRegistro && <small id="ayuda-password">{t('acceso.minimo')}</small>}
        </label>

        {error && (
          <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>
        )}

        <button className="boton" disabled={enviando}>
          {enviando ? t('acceso.enviando') : esRegistro ? t('acceso.botonCrear') : t('acceso.botonEntrar')}
        </button>
      </form>
    </section>
  )
}
