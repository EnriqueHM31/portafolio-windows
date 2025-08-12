import { create } from "zustand";
import { VOLUMEN_LOCALSTORAGE_KEYS } from "@/constants/BarraTareas";

const getInitialVolumen = () => {
    const stored = localStorage.getItem(VOLUMEN_LOCALSTORAGE_KEYS.volumen);
    return stored ? Number(stored) : 100;
};

interface StoreVolumen {
    volumen: number;
    modificarVolumen: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setVolumen: (value: number) => void;
}

export const useStoreVolumen = create<StoreVolumen>((set) => ({
    volumen: getInitialVolumen(),

    modificarVolumen: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        localStorage.setItem(VOLUMEN_LOCALSTORAGE_KEYS.volumen, value.toString());
        set({ volumen: value });
    },

    setVolumen: (value: number) => {
        localStorage.setItem(VOLUMEN_LOCALSTORAGE_KEYS.volumen, value.toString());
        set({ volumen: value });
    },
}));
