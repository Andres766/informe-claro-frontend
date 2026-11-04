# InformeClaro — Frontend

Interfaz web de **InformeClaro**, el traductor de resultados de laboratorio a lenguaje sencillo.
El paciente sube el PDF de su examen y recibe la explicación de cada valor, comparado con su
rango de referencia, más preguntas para llevar a su próxima consulta. **Nunca diagnostica ni
recomienda tratamiento**: la decisión clínica es 100 % del médico.

Proyecto final individual — Programación Orientada a la Web, Ingeniería de Software, UCC Pasto.

- App desplegada: https://informe-claro.vercel.app
- Backend (API FastAPI): https://github.com/Andres766/informe-claro-backend

Stack: React · Vite · CSS propio · PWA (manifest + Service Worker).

---

## Cómo ejecutarlo

Requisitos: Node 20+ y el [backend](https://github.com/Andres766/informe-claro-backend)
corriendo en `http://localhost:8000`.

```bash
npm install
npm run dev      # http://localhost:5173
```

En desarrollo, Vite redirige `/api` al backend local (ver `vite.config.js`).
En producción se define `VITE_API_URL` con la URL pública del backend.

## Funcionalidades

- Registro e inicio de sesión (token JWT); cada usuario ve solo su propio historial.
- Carga del PDF con arrastrar y soltar.
- Resultados: resumen, cada valor con su barra de rango y explicación en lenguaje sencillo,
  filtro de valores fuera de rango y preguntas sugeridas que se pueden copiar.
- Historial de informes con opción de eliminar.
- PWA: la carcasa de la app abre sin conexión; los datos de salud (`/api`) nunca se guardan en caché.

## Idiomas y temas

- **Español e inglés:** botón ES/EN en la barra superior. La elección se guarda y la primera vez se usa
  el idioma del navegador. Toda la interfaz está en `src/i18n/` (`es.js`, `en.js`); el idioma viaja al
  backend (`Accept-Language` y campo `idioma` al subir), así que la explicación, el resumen y las
  preguntas también salen en el idioma elegido.
- **Modo claro, oscuro o automático:** botón de tema en la barra (automático → claro → oscuro). En
  automático sigue al sistema; la elección se guarda y se aplica antes de pintar (`src/tema.js`).
  La paleta oscura redefine los mismos tokens de color de `src/index.css`; la hoja impresa sale
  siempre en claro.

## Estructura

| Archivo | Rol |
|---|---|
| `src/api.js` | Cliente de la API, manejo de la sesión e idioma de las peticiones |
| `src/App.jsx` | Navegación entre vistas y control de sesión |
| `src/components/Acceso.jsx` | Inicio de sesión y registro |
| `src/components/SubirInforme.jsx` | Carga del PDF |
| `src/components/ResultadoInforme.jsx` | Explicación de los valores y preguntas sugeridas |
| `src/components/Historial.jsx` | Informes anteriores del usuario |
| `src/i18n/` | Diccionarios en español e inglés y contexto de idioma |
| `src/tema.js`, `src/components/Preferencias.jsx` | Tema claro/oscuro y botones de idioma y tema |
| `public/sw.js` | Service Worker |

## Despliegue (Vercel)

Framework: Vite · Build: `npm run build` · Salida: `dist`.
Variable de entorno: `VITE_API_URL` = URL del backend (sin `/` al final).
