import { create } from "zustand";

interface Aplicacion {
    id: number;
    label: string;
    icono: string;
    active: boolean;
}

interface StoreAplicacionesPredeterminadas {
    aplicacionesPredeterminadas: Aplicacion[];
    obtenerAplicacionesPredeterminadas: () => Promise<void>;
    onRemove: (id: number) => void;
    onRename: (id: number, nuevoNombre: string) => void;
}

export const useStoreAplicacionesPredeterminadas = create<StoreAplicacionesPredeterminadas>((set, get) => ({
    aplicacionesPredeterminadas: [],
    obtenerAplicacionesPredeterminadas: async () => {
        const guardados = await fetch("http://localhost:5173/aplicacionesPredeterminadas.json");
        const json = await guardados.json();
        set({ aplicacionesPredeterminadas: json });
    },

    onRemove: (id: number) => {
        set({
            aplicacionesPredeterminadas: get().aplicacionesPredeterminadas.filter((app) => app.id !== id)
        })
    },

    onRename: (id: number, nuevoNombre: string) => {
        set({
            aplicacionesPredeterminadas: get().aplicacionesPredeterminadas.map((app) => (app.id === id ? { ...app, label: nuevoNombre } : app))
        })
    },
}));