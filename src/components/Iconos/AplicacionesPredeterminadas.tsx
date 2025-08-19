import CHROME from '@/assets/img/aplicaciones/chrome.webp'
import CONFIGURACION from '@/assets/img/aplicaciones/configuracion.webp'
import EXPLORADORARCHIVOS from '@/assets/img/aplicaciones/explorador.webp'
import BLOCKNOTAS from '@/assets/img/aplicaciones/blocNotas.webp'


const ICONOS_APLICACIONES_PREDETERMINADAS: Record<string, string> = {
    CHROME,
    EXPLORADORARCHIVOS,
    CONFIGURACION,
    BLOCKNOTAS,
};

// Ejemplo de uso con valor dinámico
export default function AplicacionesPredeterminadasIcon({ nombreIcono }: { nombreIcono: string }) {
    const Icono = ICONOS_APLICACIONES_PREDETERMINADAS[nombreIcono];
    return Icono ? <img src={Icono} alt={`Aplicacion ${nombreIcono}`} className="w-full h-full" /> : null;
}
