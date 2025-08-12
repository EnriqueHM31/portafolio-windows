import { EnumModoRendimiento } from "@/types/barraTareas/Bateria";
import type { Rendimiento } from "@/types/barraTareas/Bateria";

export function fondoRendimiento(rendimientoActivado: Rendimiento) {

    if (!rendimientoActivado) return "bg-transparent";

    if (rendimientoActivado.modo === EnumModoRendimiento.MaximaDuracion) return "bg-black/30";
    if (rendimientoActivado.modo === EnumModoRendimiento.Equilibrado) return "bg-black/10";
    if (rendimientoActivado.modo === EnumModoRendimiento.MaximoRendimiento) return "bg-transparent";

    return "bg-transparent";
}