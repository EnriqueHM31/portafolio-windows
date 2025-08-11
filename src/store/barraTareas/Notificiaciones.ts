import { create } from 'zustand';

interface Notificacion {
    id: number;
    header: string;
    titulo: string;
    descripcion: string;
    icono: string;
}

interface StoreNotificaciones {
    notificaciones: Notificacion[];
    obtenerNotificaciones: () => Promise<void>;
    eliminarAllNotificaciones: () => void;
    eliminarNotificacion: (id: number) => void;
}

export const useStoreNotificaciones = create<StoreNotificaciones>((set) => ({
    notificaciones: [],
    async obtenerNotificaciones() {
        const notificaciones = await fetch('http://localhost:5173/notificaciones.json');
        const notificacionesJson = await notificaciones.json();
        set({ notificaciones: notificacionesJson });
    },
    eliminarAllNotificaciones: () => set({ notificaciones: [] }),
    eliminarNotificacion: (id: number) => set((state) => {
        const notificaciones = state.notificaciones.filter(n => n.id !== id);
        return { notificaciones };
    }),
}));