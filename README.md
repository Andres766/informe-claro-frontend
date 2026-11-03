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

## Estructura

| Archivo | Rol |
|---|---|
| `src/api.js` | Cliente de la API y manejo de la sesión |
| `src/App.jsx` | Navegación entre vistas y control de sesión |
| `src/components/Acceso.jsx` | Inicio de sesión y registro |
| `src/components/SubirInforme.jsx` | Carga del PDF |
| `src/components/ResultadoInforme.jsx` | Explicación de los valores y preguntas sugeridas |
| `src/components/Historial.jsx` | Informes anteriores del usuario |
| `public/sw.js` | Service Worker |

## Despliegue (Vercel)

Framework: Vite · Build: `npm run build` · Salida: `dist`.
Variable de entorno: `VITE_API_URL` = URL del backend (sin `/` al final).
