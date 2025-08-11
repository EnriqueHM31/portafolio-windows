import { SiGooglemaps } from "react-icons/si";
import { MdEco } from "react-icons/md";
import { FaBluetoothB } from "react-icons/fa";
import { MdBrightness4 } from "react-icons/md";
import type { IconType } from "react-icons";


const ICONOS_AJUSTESPREDETERMINADOS: Record<string, IconType> = {
    SiGooglemaps,
    MdEco,
    FaBluetoothB,
    MdBrightness4
};

// Ejemplo de uso con valor dinámico
export default function AjustesPredeterminadosIcon({ nombreIcono, styles }: { nombreIcono: string, styles?: string }) {
    const Icono = ICONOS_AJUSTESPREDETERMINADOS[nombreIcono];
    return Icono ? <Icono className={styles} /> : null;
}
