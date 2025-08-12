import { create } from 'zustand';
import { EnumModoRendimiento, type Rendimiento } from "@/types/barraTareas/Bateria";
import { useStoreAjustesPredeterminados } from './AjustesPredeterminados';


interface StoreBateriaRendimiento {
    rendimientoActivado: Rendimiento;
    rendimientos: Rendimiento[];
    obtenerRendimiento: () => Promise<void>;
    cambiarRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => void;
    modificarRendimientoMaximaDuracion: () => void;
    modificarRendimientoPorDefecto: () => void;
}

const loadFromLocalStorage = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

export const useStoreBateriaRendimiento = create<StoreBateriaRendimiento>((set) => ({
    rendimientoActivado: loadFromLocalStorage("rendimientoActivado") || [],
    rendimientos: loadFromLocalStorage("rendimientos") || [],
    obtenerRendimiento: async () => {
        const guardados = loadFromLocalStorage("rendimientos");
        if (guardados && guardados.length > 0) {
            set({
                rendimientos: guardados,
            });
            return; // no sobreescribas si ya hay datos en localStorage
        }

        // Si no hay datos, sí haz fetch
        const res = await fetch("http://localhost:5173/rendimiento.json");
        const json = await res.json();


        const RendimientoDefecto = json.find((r: Rendimiento) => r.active);


        localStorage.setItem("rendimientoActivado", JSON.stringify(RendimientoDefecto));
        localStorage.setItem("rendimientos", JSON.stringify(json));

        set({
            rendimientoActivado: RendimientoDefecto,
            rendimientos: json,
        });
    },

    cambiarRendimiento: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        set((state) => {
            const rendimientosModificados = state.rendimientos.map((r) => ({
                ...r,
                active: r.value === value // el seleccionado queda true, los demás false
            }));

            const RendimientoDefecto = rendimientosModificados.find((r) => r.active);

            if (RendimientoDefecto?.modo !== EnumModoRendimiento.MaximaDuracion) {
                const modificarAjusteAhorroBateria = useStoreAjustesPredeterminados.getState().modificarAjusteAhorroBateria;
                modificarAjusteAhorroBateria();
            }

            localStorage.setItem("rendimientoActivado", JSON.stringify(RendimientoDefecto));
            localStorage.setItem("rendimientos", JSON.stringify(rendimientosModificados));


            return {
                rendimientoActivado: rendimientosModificados.find((r) => r.active),
                rendimientos: rendimientosModificados,
            };
        });
    },
    modificarRendimientoMaximaDuracion: () => {
        set((state) => {
            const RendimientoDefecto = state.rendimientos.find((r) => r.modo === EnumModoRendimiento.MaximaDuracion);
            localStorage.setItem("rendimientoActivado", JSON.stringify(RendimientoDefecto));
            return {
                rendimientoActivado: RendimientoDefecto,
                rendimientos: state.rendimientos,
            };
        });
    },
    modificarRendimientoPorDefecto: () => {
        set((state) => {
            const RendimientoDefecto = state.rendimientos.find((r) => r.modo === EnumModoRendimiento.MaximoRendimiento);
            localStorage.setItem("rendimientoActivado", JSON.stringify(RendimientoDefecto));
            return {
                rendimientoActivado: RendimientoDefecto,
                rendimientos: state.rendimientos,
            };
        });
    }

}));
