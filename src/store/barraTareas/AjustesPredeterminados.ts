import { create } from "zustand";
import { useStoreBateriaRendimiento } from "./BateriaRendimiento";

interface AjustesPredeterminados {
    id: number;
    icono: string;
    titulo: string;
    active: boolean;
}

interface StoreAjustesPredeterminados {
    ajustesPredeterminados: AjustesPredeterminados[];
    ajustesPredeterminadosActivados: AjustesPredeterminados[];
    obtenerAjustesPredeterminados: () => Promise<void>;
    setAjustesPredeterminados: (ajustesPredeterminados: AjustesPredeterminados[]) => void;
    activarAjustePredeterminado: (id: number) => void;
    activarAhorroBateria: () => void;
    desactivarAhorroBateria: () => void;
}

const loadFromLocalStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

export const useStoreAjustesPredeterminados = create<StoreAjustesPredeterminados>((set) => ({

    ajustesPredeterminados: loadFromLocalStorage("ajustesPredeterminados") || [],
    ajustesPredeterminadosActivados: loadFromLocalStorage("ajustesPredeterminadosActivos") || [],

    obtenerAjustesPredeterminados: async () => {
        const guardados = loadFromLocalStorage("ajustesPredeterminados");
        if (guardados && guardados.length > 0) {

            set({
                ajustesPredeterminados: guardados,
                ajustesPredeterminadosActivados: guardados.filter((a: AjustesPredeterminados) => a.active)
            });
            return; // no sobreescribas si ya hay datos en localStorage
        }

        // Si no hay datos, sí haz fetch
        const res = await fetch("http://localhost:5173/ajustesPredeterminados.json");
        const json = await res.json();

        localStorage.setItem("ajustesPredeterminados", JSON.stringify(json));
        localStorage.setItem("ajustesPredeterminadosActivos", JSON.stringify(json.filter((a: AjustesPredeterminados) => a.active)));

        set({
            ajustesPredeterminados: json,
            ajustesPredeterminadosActivados: json.filter((a: AjustesPredeterminados) => a.active)
        });
    },

    setAjustesPredeterminados: (ajustesPredeterminados) => {
        localStorage.setItem("ajustesPredeterminados", JSON.stringify(ajustesPredeterminados));
        localStorage.setItem("ajustesPredeterminadosActivos", JSON.stringify(ajustesPredeterminados.filter(a => a.active)));
        set({
            ajustesPredeterminados,
            ajustesPredeterminadosActivados: ajustesPredeterminados.filter(a => a.active)
        });
    },

    activarAjustePredeterminado: (id) => {
        set((state) => {
            const nuevos = state.ajustesPredeterminados.map(a => {
                if (a.id !== id) return a;

                const nuevoEstado = !a.active;

                return {
                    ...a,
                    active: nuevoEstado,
                    titulo:
                        a.id === 3
                            ? a.active ? "No conectado" : "Conectado"
                            : a.titulo
                };
            });

            const ajuste = nuevos.find(a => a.id === 2);

            console.log(ajuste?.active);
            if (ajuste?.active) {
                const modificarRendimientoMaximaDuracion = useStoreBateriaRendimiento.getState().forzarMaximaDuracion;
                modificarRendimientoMaximaDuracion();
            } else if (!ajuste?.active) {
                const modificarRendimientoPorDefecto = useStoreBateriaRendimiento.getState().restaurarRendimientoAnterior;
                modificarRendimientoPorDefecto();
            }

            localStorage.setItem("ajustesPredeterminados", JSON.stringify(nuevos));
            localStorage.setItem("ajustesPredeterminadosActivos", JSON.stringify(nuevos.filter(a => a.active)));
            return {
                ajustesPredeterminados: nuevos,
                ajustesPredeterminadosActivados: nuevos.filter(a => a.active)
            };
        });
    },


    activarAhorroBateria: () => {
        set((state) => {
            const nuevos = state.ajustesPredeterminados.map(a => {
                if (a.id !== 2) return a;

                const nuevoEstado = true;

                return {
                    ...a,
                    active: nuevoEstado,
                };
            });
            localStorage.setItem("ajustesPredeterminados", JSON.stringify(nuevos));
            localStorage.setItem("ajustesPredeterminadosActivos", JSON.stringify(nuevos.filter(a => a.active)));
            return {
                ajustesPredeterminados: nuevos,
                ajustesPredeterminadosActivados: nuevos.filter(a => a.active)
            };
        });
    },

    desactivarAhorroBateria: () => {
        set((state) => {
            const nuevos = state.ajustesPredeterminados.map(a => {
                if (a.id !== 2) return a;
                return {
                    ...a,
                    active: false,
                };
            });
            localStorage.setItem("ajustesPredeterminados", JSON.stringify(nuevos));
            localStorage.setItem("ajustesPredeterminadosActivos", JSON.stringify(nuevos.filter(a => a.active)));
            return {
                ajustesPredeterminados: nuevos,
                ajustesPredeterminadosActivados: nuevos.filter(a => a.active)
            };
        });
    }


}));
