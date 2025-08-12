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
    forzarMaximaDuracion: () => void;
    restaurarRendimientoAnterior: () => void;
}

const loadFromLocalStorage = <T,>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    } catch {
        return null;
    }
};

const saveToLocalStorage = (data: Partial<Record<keyof typeof BATERIA_LOCALSTORAGE_KEYS, unknown>>) => {
    Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS[key as keyof typeof BATERIA_LOCALSTORAGE_KEYS], JSON.stringify(value));
    });
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

        if (guardados?.length) {
            const maxDuracionActivo = guardados.some(r => r.modo === EnumModoRendimiento.MaximaDuracion && r.active);
            const ajustes = useStoreAjustesPredeterminados.getState();
            if (maxDuracionActivo) {
                ajustes.activarAhorroBateria();
            } else {
                ajustes.desactivarAhorroBateria();
            }
            set({ rendimientos: guardados });
            return;
        }

        const res = await fetch("http://localhost:5173/rendimiento.json");
        const json: Rendimiento[] = await res.json();
        const activo = json.find(r => r.active) || json[0];

        saveToLocalStorage({
            rendimientoActivado: activo,
            rendimientos: json,
            rendimientoAntiguo: activo
        });

        set({
            rendimientoActivado: activo,
            rendimientos: json,
            rendimientoAntiguo: activo,
        });
    },

    cambiarRendimiento: (event) => {
        const value = Number(event.target.value);
        const nuevos = get().rendimientos.map(r => ({ ...r, active: r.value === value }));
        const nuevoActivo = nuevos.find(r => r.active)!;

        if (nuevoActivo.modo !== EnumModoRendimiento.MaximaDuracion) {
            saveToLocalStorage({ rendimientoAntiguo: nuevoActivo });
        } else {
            useStoreAjustesPredeterminados.getState().activarAhorroBateria();
        }

        saveToLocalStorage({
            rendimientoActivado: nuevoActivo,
            rendimientos: nuevos
        });

        set({
            rendimientoActivado: nuevoActivo,
            rendimientos: nuevos,
            rendimientoAntiguo: nuevoActivo.modo !== EnumModoRendimiento.MaximaDuracion
                ? nuevoActivo
                : get().rendimientoAntiguo,
        });
    },

    forzarMaximaDuracion: () => {
        const { rendimientos, rendimientoActivado } = get();

        if (rendimientoActivado.modo !== EnumModoRendimiento.MaximaDuracion) {
            saveToLocalStorage({ rendimientoAntiguo: rendimientoActivado });
        }

        const maxDuracion = rendimientos.find(r => r.modo === EnumModoRendimiento.MaximaDuracion);
        if (!maxDuracion) return;

        const nuevos = rendimientos.map(r => ({ ...r, active: r === maxDuracion }));

        saveToLocalStorage({
            rendimientoActivado: maxDuracion,
            rendimientos: nuevos
        });

        set({
            rendimientoActivado: maxDuracion,
            rendimientos: nuevos,
        });
    },

    restaurarRendimientoAnterior: () => {
        const { rendimientoAntiguo, rendimientos } = get();
        if (!rendimientoAntiguo) return;

        const nuevos = rendimientos.map(r => ({ ...r, active: r.modo === rendimientoAntiguo.modo }));

        saveToLocalStorage({
            rendimientoActivado: rendimientoAntiguo,
            rendimientos: nuevos
        });

        set({
            rendimientoActivado: rendimientoAntiguo,
            rendimientos: nuevos,
        });
    }
}));
