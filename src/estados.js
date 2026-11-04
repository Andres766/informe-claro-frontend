// Un valor merece conversación con el médico cuando quedó por encima o por debajo del rango.
export const fueraDeRango = (estado) => estado === 'alto' || estado === 'bajo'

// Permite cortar nombres de archivo largos en "_", "-" y "." sin partir palabras.
export const partible = (texto) => String(texto).replace(/([_.-])/g, '$1\u200b')
