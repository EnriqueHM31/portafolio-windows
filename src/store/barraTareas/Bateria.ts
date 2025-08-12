import { create } from 'zustand';
import { BATERIA_LOCALSTORAGE_KEYS } from "@/constants/BarraTareas";

// Función para obtener valor inicial desde localStorage o valor por defecto
const getInitialBattery = () => {
    const stored = localStorage.getItem(BATERIA_LOCALSTORAGE_KEYS.Bateria);
    return stored ? parseInt(stored, 10) : 100;
};

interface StoreBateria {
    Bateria: number;
    setBateria: (value: number) => void;
}

export const useStoreBateria = create<StoreBateria>((set) => {
    // Intervalo para reducir batería
    setInterval(() => {
        set((state) => {
            const newValue = state.Bateria > 0 ? state.Bateria - 1 : 100;
            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.Bateria, newValue.toString());
            return { Bateria: newValue };
        });
    }, 15000); // cada 15 segundos

    return {
        Bateria: getInitialBattery(),
        setBateria: (value) => {
            localStorage.setItem(BATERIA_LOCALSTORAGE_KEYS.Bateria, value.toString());
            set({ Bateria: value });
        }
    };
});
