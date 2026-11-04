import { useEffect, useState } from 'react'
import { FilePlus2, Files, LoaderCircle, LogOut } from 'lucide-react'
import { api, sesion } from './api'
import { useIdioma } from './i18n/contexto'
import Preferencias from './components/Preferencias'
import Logo from './components/Logo'
import Acceso from './components/Acceso'
import SubirInforme from './components/SubirInforme'
import ResultadoInforme from './components/ResultadoInforme'
import Historial from './components/Historial'

export default function App() {
  const { t } = useIdioma()
  // undefined = comprobando la sesión guardada; null = sin sesión
  const [usuario, setUsuario] = useState(sesion.activa() ? undefined : null)
  const [avisoAcceso, setAvisoAcceso] = useState('')
  const [vista, setVista] = useState('subir') // 'subir' | 'resultado' | 'historial'
  const [informe, setInforme] = useState(null)
  const [motor, setMotor] = useState(null)

  useEffect(() => {
    api.salud().then((s) => setMotor(s.motor)).catch(() => setMotor(null))

    sesion.alExpirar(() => {
      setUsuario(null)
      setAvisoAcceso('sesionExpirada')
    })

    if (sesion.activa()) {
      api.yo()
        .then(setUsuario)
        .catch((e) => {
          setUsuario(null)
          if (sesion.activa()) setAvisoAcceso(e.message) // error de red, no de sesión
        })
    }
  }, [])

  const ingresar = (u) => {
    setAvisoAcceso('')
    setVista('subir')
    setInforme(null)
    setUsuario(u)
  }

  const salir = () => {
    sesion.cerrar()
    setUsuario(null)
    setAvisoAcceso('')
    setInforme(null)
  }

  const mostrarInforme = (datos) => {
    setInforme(datos)
    setVista('resultado')
    window.scrollTo({ top: 0 })
  }

  const enHistorial = vista === 'historial'

  return (
    <div className="app">
      <header className="barra">
        <div className="barra__interior">
          <span className="marca">
            <Logo size={34} />
            InformeClaro
          </span>

          <Preferencias />

          {usuario && (
            <>
              <nav className="navegacion" aria-label={t('app.secciones')}>
                <button className={!enHistorial ? 'activa' : ''} aria-current={!enHistorial ? 'page' : undefined}
                  onClick={() => setVista('subir')}>
                  <FilePlus2 size={19} aria-hidden="true" /> {t('app.nuevo')}
                </button>
                <button className={enHistorial ? 'activa' : ''} aria-current={enHistorial ? 'page' : undefined}
                  onClick={() => setVista('historial')}>
                  <Files size={19} aria-hidden="true" /> {t('app.hojas')}
                </button>
              </nav>
              <div className="cuenta">
                <span className="cuenta__nombre" title={usuario.email}>{usuario.nombre.split(' ')[0]}</span>
                <button className="boton-texto" onClick={salir} aria-label={t('app.salir')}>
                  <LogOut size={18} aria-hidden="true" /> <span className="cuenta__salir">{t('app.salir')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="contenido">
        {usuario === undefined && (
          <p className="conectando" role="status">
            <LoaderCircle className="girando" size={22} aria-hidden="true" />
            {t('app.conectando')}
          </p>
        )}
        {usuario === null && (
          <Acceso onIngreso={ingresar} aviso={avisoAcceso === 'sesionExpirada' ? t('app.sesionExpirada') : avisoAcceso} />
        )}
        {usuario && vista === 'subir' && <SubirInforme onListo={mostrarInforme} motor={motor} />}
        {usuario && vista === 'resultado' && informe && (
          <ResultadoInforme informe={informe} onNuevo={() => setVista('subir')} />
        )}
        {usuario && enHistorial && <Historial onAbrir={mostrarInforme} onNuevo={() => setVista('subir')} />}
      </main>

      <footer className="pie">{t('app.pie')}</footer>
    </div>
  )
}
