import { create } from "zustand"

interface AjustesPredeterminados {
    id: number,
    icono: string,
    titulo: string,
    active: boolean
}

interface StoreAjustesPredeterminados {
    ajustesPredeterminados: AjustesPredeterminados[],
    obtenerAjustesPredeterminados: () => Promise<void>,
    setAjustesPredeterminados: (ajustesPredeterminados: AjustesPredeterminados[]) => void
    activarAjustePredeterminado: (id: number) => void
}

export const useStoreAjustesPredeterminados = create<StoreAjustesPredeterminados>((set, get) => ({
    ajustesPredeterminados: [] as AjustesPredeterminados[],
    obtenerAjustesPredeterminados: async () => {
        const ajustesPredeterminados = await fetch("http://localhost:5173/ajustesPredeterminados.json")
        const jsonAjustesPredeterminados = await ajustesPredeterminados.json()

        set({ ajustesPredeterminados: jsonAjustesPredeterminados })
    },
    setAjustesPredeterminados: (ajustesPredeterminados: AjustesPredeterminados[]) => set({ ajustesPredeterminados }),
    activarAjustePredeterminado: (id: number) => {
        set({
            ajustesPredeterminados: get().ajustesPredeterminados.map(ajuste => {
                if (ajuste.id === id) {
                    return {
                        ...ajuste,
                        active: !ajuste.active
                    }
                }
                return ajuste;
            })
        })
    }
}))