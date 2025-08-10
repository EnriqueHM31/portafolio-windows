import CHROME from '@/assets/img/aplicaciones/chrome.webp'
import CONFIGURACION from '@/assets/img/aplicaciones/configuracion.webp'
import EXPLORADORARCHIVOS from '@/assets/img/aplicaciones/explorador.webp'

export const APPS_PREDETERMINADAS = [
    { id: 1, label: 'Chrome', icono: CHROME, active: true },
    { id: 2, label: 'Explorador', icono: EXPLORADORARCHIVOS, active: false },
    { id: 3, label: 'Configuración', icono: CONFIGURACION, active: false },
] as const