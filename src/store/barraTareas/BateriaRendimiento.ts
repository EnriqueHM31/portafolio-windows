import { create } from "zustand";
import { EnumModoRendimiento, type Rendimiento } from "@/types/barraTareas/Bateria";
import { BATERIA_LOCALSTORAGE_KEYS } from "@/constants/BarraTareas";
import { useStoreAjustesPredeterminados } from "./AjustesPredeterminados";

interface StoreBateriaRendimiento {
    rendimientoActivado: Rendimiento;
    rendimientos: Rendimiento[];
    rendimientoAntiguo: Rendimiento | null;
    obtenerRendimiento: () => Promise<void>;
    cambiarRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => void;
    forzarMaximaDuracion: () => void; // activar ahorro
    restaurarRendimientoAnterior: () => void; // desactivar ahorro
}

const loadFromLocalStorage = <T,>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    } catch {
        return null;
    }
};

export const useStoreBateriaRendimiento = create<StoreBateriaRendimiento>((set, get) => ({
    rendimientoActivado: loadFromLocalStorage<Rendimiento>(BATERIA_LOCALSTORAGE_KEYS.rendimientoActivado) || {
        id: 3,
        modo: EnumModoRendimiento.MaximoRendimiento,
        active: true,
        value: 100
    },
    rendimientos: loadFromLocalStorage<Rendimiento[]>(BATERIA_LOCALSTORAGE_KEYS.rendimientos) || [],
    rendimientoAntiguo: loadFromLocalStorage<Rendimiento>(BATERIA_LOCALSTORAGE_KEYS.rendimientoAntiguo) || null,

    obtenerRendimiento: async () => {
        const guardados = loadFromLocalStorage<Rendimiento[]>(BATERIA_LOCALSTORAGE_KEYS.rendimientos);

        if (guardados && guardados.length > 0) {
            console.log("guardados", guardados);
            const rendimientoMaximaDuracion = guardados.find(r => r.modo === EnumModoRendimiento.MaximaDuracion);

            if (rendimientoMaximaDuracion?.active) {
                const forzarMaximaDuracion = useStoreAjustesPredeterminados.getState().activarAhorroBateria;
                forzarMaximaDuracion();
            } else if (!rendimientoMaximaDuracion?.active) {
                const restaurarRendimientoAnterior = useStoreAjustesPredeterminados.getState().desactivarAhorroBateria;
                restaurarRendimientoAnterior();
            }
            set({ rendimientos: guardados });
            return;
        }

        const res = await fetch("http://localhost:5173/rendimiento.json");
        const json: Rendimiento[] = await res.json();
        const activo = json.find(r => r.active) || json[0];

        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoActivado, JSON.stringify(activo));
        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientos, JSON.stringify(json));
        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoAntiguo, JSON.stringify(activo));

        set({
            rendimientoActivado: activo,
            rendimientos: json,
            rendimientoAntiguo: activo,
        });
    },

    cambiarRendimiento: (event) => {
        const value = Number(event.target.value);

        set((state) => {
            const nuevos = state.rendimientos.map(r => ({
                ...r,
                active: r.value === value
            }));

            const nuevoActivo = nuevos.find(r => r.active)!;
            const activoMaximaDuracion = nuevos.find(r => r.modo === EnumModoRendimiento.MaximaDuracion);
            console.log(nuevoActivo);
            console.log(activoMaximaDuracion);
            // Si NO es máxima duración, lo guardamos como antiguo
            if (nuevoActivo.modo !== EnumModoRendimiento.MaximaDuracion) {
                localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoAntiguo, JSON.stringify(nuevoActivo));
            }

            if (nuevoActivo.active && nuevoActivo.modo === EnumModoRendimiento.MaximaDuracion) {
                const activarAjustePredeterminado = useStoreAjustesPredeterminados.getState().activarAhorroBateria;
                activarAjustePredeterminado();
            }

            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoActivado, JSON.stringify(nuevoActivo));
            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientos, JSON.stringify(nuevos));
            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoAntiguo, JSON.stringify(nuevoActivo));

            return {
                rendimientoActivado: nuevoActivo,
                rendimientos: nuevos,
                rendimientoAntiguo: nuevoActivo.modo !== EnumModoRendimiento.MaximaDuracion
                    ? nuevoActivo
                    : state.rendimientoAntiguo,
            };
        });
    },

    forzarMaximaDuracion: () => {
        const { rendimientos, rendimientoActivado } = get();

        // Guardamos el actual como antiguo antes de cambiar
        if (rendimientoActivado.modo !== EnumModoRendimiento.MaximaDuracion) {
            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoAntiguo, JSON.stringify(rendimientoActivado));
        }

        const maxDuracion = rendimientos.find(r => r.modo === EnumModoRendimiento.MaximaDuracion);
        if (!maxDuracion) return;

        const nuevos = rendimientos.map(r => ({
            ...r,
            active: r.modo === EnumModoRendimiento.MaximaDuracion
        }));

        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoActivado, JSON.stringify(maxDuracion));
        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientos, JSON.stringify(nuevos));

        set({
            rendimientoActivado: maxDuracion,
            rendimientos: nuevos,
        });
    },

    restaurarRendimientoAnterior: () => {
        const { rendimientoAntiguo, rendimientos } = get();
        if (!rendimientoAntiguo) return;

        const nuevos = rendimientos.map(r => ({
            ...r,
            active: r.modo === rendimientoAntiguo.modo
        }));

        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientoActivado, JSON.stringify(rendimientoAntiguo));
        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.rendimientos, JSON.stringify(nuevos));

        set({
            rendimientoActivado: rendimientoAntiguo,
            rendimientos: nuevos,
        });
    }
}));
