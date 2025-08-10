import { useEffect, useState } from "react";

export function useTiempo() {
    const [fechaHora, setFechaHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setFechaHora(new Date());
        }, 1000);

        return () => clearInterval(timer); // limpiar intervalo al desmontar
    }, []);

    const hora = fechaHora.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    const fecha = fechaHora.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    const fechaFinal = fechaHora.toLocaleDateString("es-ES", {
        weekday: "long",  // día de la semana
        day: "numeric",   // número del día
        month: "long",    // mes en palabras
        year: "numeric"   // año completo
    });

    return { hora, fecha, fechaFinal }
}