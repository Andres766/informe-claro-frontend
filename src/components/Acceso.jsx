import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, FileX2, Lock, Stethoscope } from 'lucide-react'
import { api, sesion } from '../api'
import Sello from './Sello'

export default function Acceso({ onIngreso, aviso }) {
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
        <h1>Entiende tu informe de laboratorio antes de la cita</h1>
        <p className="entrada">
          Sube el PDF de tu examen. Te explicamos cada valor en palabras sencillas, lo comparamos con
          el rango que trae el informe y te damos preguntas para llevarle a tu médico.
        </p>
      </div>

      <figure className="hoja hoja--rayada acceso__ejemplo">
        <figcaption>Así se ve un valor en tu hoja · ejemplo con datos ficticios</figcaption>
        <div className="valor valor--ejemplo">
          <span className="valor__nombre">Colesterol HDL</span>
          <span className="valor__cifra"><span className="valor__numero">36</span><small>mg/dL</small></span>
          <span className="valor__rango">ref. más de 40</span>
          <span className="valor__sello"><Sello estado="bajo" /></span>
          <p className="valor__frase">
            Mide el «colesterol bueno», que ayuda a retirar grasa de las arterias. Es un buen tema
            para conversar con tu médico.
          </p>
        </div>
      </figure>

      <ul className="promesas acceso__promesas">
        <li><Lock size={20} aria-hidden="true" /> Tu historial es privado: solo tú puedes verlo.</li>
        <li><FileX2 size={20} aria-hidden="true" /> No guardamos tu PDF, solo los valores y su explicación.</li>
        <li><Stethoscope size={20} aria-hidden="true" /> No es un diagnóstico: la decisión es de tu médico.</li>
      </ul>

      <form className="hoja formulario acceso__form" onSubmit={enviar} noValidate>
        <div className="pestanas" role="tablist" aria-label="Acceso">
          <button type="button" role="tab" aria-selected={!esRegistro} className={!esRegistro ? 'activa' : ''}
            onClick={() => cambiarModo('login')}>
            Iniciar sesión
          </button>
          <button type="button" role="tab" aria-selected={esRegistro} className={esRegistro ? 'activa' : ''}
            onClick={() => cambiarModo('registro')}>
            Crear cuenta
          </button>
        </div>

        <h2 className="sr-only">{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
        {aviso && !error && <p className="nota" role="status">{aviso}</p>}

        {esRegistro && (
          <label className="campo">
            <span>Tu nombre</span>
            <input name="nombre" value={datos.nombre} onChange={cambiar} autoComplete="name" required />
          </label>
        )}
        <label className="campo">
          <span>Correo electrónico</span>
          <input name="email" type="email" inputMode="email" value={datos.email} onChange={cambiar}
            autoComplete="email" required />
        </label>
        <label className="campo">
          <span>Contraseña</span>
          <span className="campo__con-boton">
            <input name="password" type={verPassword ? 'text' : 'password'} value={datos.password} onChange={cambiar}
              required minLength={esRegistro ? 8 : undefined}
              autoComplete={esRegistro ? 'new-password' : 'current-password'}
              aria-describedby={esRegistro ? 'ayuda-password' : undefined} />
            <button type="button" className="boton-texto" onClick={() => setVerPassword(!verPassword)}
              aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={verPassword}>
              {verPassword ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
              {verPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </span>
          {esRegistro && <small id="ayuda-password">Mínimo 8 caracteres.</small>}
        </label>

        {error && (
          <p className="alerta" role="alert"><AlertCircle size={20} aria-hidden="true" /> {error}</p>
        )}

        <button className="boton" disabled={enviando}>
          {enviando ? 'Un momento…' : esRegistro ? 'Crear mi cuenta' : 'Entrar'}
        </button>
      </form>
    </section>
  )
}
