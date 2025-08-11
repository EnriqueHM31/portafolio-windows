import { MdOutlineEventAvailable } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import type { IconType } from "react-icons";

const ICONOS_NOTIFICACIONES: Record<string, IconType> = {
    MdOutlineEventAvailable,
    GrProjects,
    PiStudentBold,
};

// Ejemplo de uso con valor dinámico
export default function NotificacionIcon({ nombreIcono, styles }: { nombreIcono: string, styles?: string }) {
    const Icono = ICONOS_NOTIFICACIONES[nombreIcono];
    return Icono ? <Icono className={styles} /> : null;
}
