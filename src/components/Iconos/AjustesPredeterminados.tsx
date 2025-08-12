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

const COLORES_AJUSTESPREDETERMINADOS: Record<string, string> = {
    SiGooglemaps: "text-red-300",
    MdEco: "text-green-500",
    FaBluetoothB: "text-blue-400",
    MdBrightness4: "text-yellow-300"
};

// Ejemplo de uso con valor dinámico
export default function AjustesPredeterminadosIcon({ nombreIcono, styles, active }: { nombreIcono: string, styles?: string, active?: boolean }) {
    const Icono = ICONOS_AJUSTESPREDETERMINADOS[nombreIcono];
    const clasesIcono = active ? COLORES_AJUSTESPREDETERMINADOS[nombreIcono] : "";

    return Icono ? <Icono className={` ${styles} ${clasesIcono}`} /> : null;
}
