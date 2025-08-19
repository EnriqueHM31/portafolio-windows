import { create } from "zustand";

interface Aplicacion {
    id: number;
    label: string;
    icono: string;
    escritorio: boolean;
    barraTareas: boolean;
    abierto: boolean;
}

interface StoreAplicacionesPredeterminadas {
    aplicacionesPredeterminadas: Aplicacion[];
    aplicacionesEscritorio: Aplicacion[];
    aplicacionesBarraTareas: Aplicacion[];
    obtenerAplicacionesPredeterminadas: () => Promise<void>;

    onRemove: (id: number) => void;
    onRename: (id: number, nuevoNombre: string) => void;
    toggleEscritorio: (id: number) => void;
    toggleBarraTareas: (id: number) => void;
}

// --- Helper para guardar en localStorage ---
const guardarEnLocalStorage = (apps: Aplicacion[]) => {
    localStorage.setItem("aplicacionesPredeterminadas", JSON.stringify(apps));
};

export const useStoreAplicacionesPredeterminadas = create<StoreAplicacionesPredeterminadas>((set, get) => ({
    aplicacionesPredeterminadas: [],
    aplicacionesEscritorio: [],
    aplicacionesBarraTareas: [],

    obtenerAplicacionesPredeterminadas: async () => {
        // Primero intenta cargar desde localStorage
        const guardadosLocal = localStorage.getItem("aplicacionesPredeterminadas");
        if (guardadosLocal) {
            const json = JSON.parse(guardadosLocal);
            set({
                aplicacionesPredeterminadas: json,
                aplicacionesEscritorio: json.filter((app: Aplicacion) => app.escritorio),
                aplicacionesBarraTareas: json.filter((app: Aplicacion) => app.barraTareas),
            });
            return;
        }

        // Si no hay en localStorage, carga desde JSON remoto
        const guardados = await fetch("http://localhost:5173/aplicacionesPredeterminadas.json");
        const json = await guardados.json();

        set({
            aplicacionesPredeterminadas: json,
            aplicacionesEscritorio: json.filter((app: Aplicacion) => app.escritorio),
            aplicacionesBarraTareas: json.filter((app: Aplicacion) => app.barraTareas),
        });

        guardarEnLocalStorage(json);
    },

    onRemove: (id: number) => {
        const nuevas = get().aplicacionesPredeterminadas.filter((app) => app.id !== id);
        set({
            aplicacionesPredeterminadas: nuevas,
            aplicacionesEscritorio: nuevas.filter((app) => app.escritorio),
            aplicacionesBarraTareas: nuevas.filter((app) => app.barraTareas),
        });
        guardarEnLocalStorage(nuevas);
    },

    onRename: (id: number, nuevoNombre: string) => {
        const nuevas = get().aplicacionesPredeterminadas.map((app) =>
            app.id === id ? { ...app, label: nuevoNombre } : app
        );
        set({
            aplicacionesPredeterminadas: nuevas,
            aplicacionesEscritorio: nuevas.filter((app) => app.escritorio),
            aplicacionesBarraTareas: nuevas.filter((app) => app.barraTareas),
        });
        guardarEnLocalStorage(nuevas);
    },

    toggleEscritorio: (id: number) => {
        const nuevas = get().aplicacionesPredeterminadas.map((app) =>
            app.id === id ? { ...app, escritorio: !app.escritorio } : app
        );
        set({
            aplicacionesPredeterminadas: nuevas,
            aplicacionesEscritorio: nuevas.filter((app) => app.escritorio),
            aplicacionesBarraTareas: nuevas.filter((app) => app.barraTareas),
        });
        guardarEnLocalStorage(nuevas);
    },

    toggleBarraTareas: (id: number) => {
        const nuevas = get().aplicacionesPredeterminadas.map((app) =>
            app.id === id ? { ...app, barraTareas: !app.barraTareas } : app
        );

        // todas las apps con barraTareas en true
        const activas = nuevas.filter((app) => app.barraTareas);

        // verificamos si la app que se modificó quedó activa
        const appModificada = nuevas.find((app) => app.id === id);

        let aplicacionesBarraTareas = activas;
        if (appModificada?.barraTareas) {
            // la movemos al final de la lista
            aplicacionesBarraTareas = [
                ...activas.filter((a) => a.id !== id),
                appModificada,
            ];
        }

        set({
            aplicacionesPredeterminadas: nuevas,
            aplicacionesEscritorio: nuevas.filter((app) => app.escritorio),
            aplicacionesBarraTareas,
        });

        guardarEnLocalStorage(nuevas);
    },

}));
