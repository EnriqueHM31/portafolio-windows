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
}

export const useStoreAplicacionesPredeterminadas = create<StoreAplicacionesPredeterminadas>((set) => ({
    aplicacionesPredeterminadas: [],
    obtenerAplicacionesPredeterminadas: async () => {
        const guardados = await fetch("http://localhost:5173/aplicacionesPredeterminadas.json");
        const json = await guardados.json();
        set({ aplicacionesPredeterminadas: json });
    },
}));