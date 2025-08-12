import { create } from "zustand";

interface Wifi {
    id: number;
    name: string;
    conectado: boolean;
    abierto: boolean;
    automatico: boolean;
    bloqueado: boolean;
    password: string;
    passwordUsuario: string;
    openPassword: boolean;
}

interface StoreWifis {
    wifis: Wifi[];
    obtenerWifis: () => Promise<void>;
    openFormPassword: (id: number) => void;
    resetearFormPassword: () => void;
    conectarWifi: (id: number, password: string) => Promise<void>
    desconectarWifi: (id: number) => Promise<void>;
    cambiarPassword: (id: number, password: string) => void;
    abrirWifi: (id: number) => void;
    cerrarWifi: () => void;
    anotarPassword: (id: number, password: string) => void;
    cambiarAutomatico: (id: number) => void;
    wifiAbiertoAutomatico: () => void;
}

const LOCAL_STORAGE_KEY = "wifis";

const loadFromLocalStorage = (): Wifi[] | null => {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
};

const saveToLocalStorage = (wifis: Wifi[]) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wifis));
    } catch {
        // manejo de error si es necesario
    }
};

export const useStoreWifis = create<StoreWifis>((set) => ({
    wifis: loadFromLocalStorage() || [],

    obtenerWifis: async () => {
        const almacenados = loadFromLocalStorage();
        if (almacenados && almacenados.length > 0) {
            set({ wifis: almacenados });
            return;
        }
        const res = await fetch("http://localhost:5173/wifis.json");
        const wifisJson = await res.json();
        const wifisOrdenados = wifisJson.toSorted((a: Wifi, b: Wifi) => Number(b.conectado) - Number(a.conectado))
        set({ wifis: wifisOrdenados });
        saveToLocalStorage(wifisOrdenados);
    },

    openFormPassword: (id) => {
        set((state) => {
            console.log({ id });
            const nuevos = state.wifis.map(w => ({ ...w, openPassword: w.id === id }));
            saveToLocalStorage(nuevos);

            return { wifis: nuevos };
        });
    },

    resetearFormPassword: () => {
        set((state) => {
            const nuevos = state.wifis.map(w => ({ ...w, openPassword: false, abierto: false }));
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    conectarWifi: (id, password) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    set((state) => {
                        const WifiAConectar = state.wifis.find(w => w.id === id);
                        console.log(WifiAConectar);
                        console.log({ password })
                        console.log({ id })
                        if (!WifiAConectar) throw new Error("Wifi no encontrado");
                        if (WifiAConectar.password !== password) throw new Error("Contraseña incorrecta");
                        const nuevos = state.wifis.map(w => ({
                            ...w,
                            conectado: id === w.id,
                            bloqueado: (id === w.id) ? false : w.bloqueado,
                        }));
                        const nuevosOrdenados = nuevos.toSorted((a, b) => Number(b.conectado) - Number(a.conectado));

                        saveToLocalStorage(nuevosOrdenados);

                        return { wifis: nuevosOrdenados };
                    });

                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 3000);
        });
    },

    desconectarWifi: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        set((state) => {
            const nuevos = state.wifis.map(w => w.id === id ? { ...w, conectado: false, abierto: false } : w);
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    cambiarPassword: (id, password) => {
        set((state) => {
            const nuevos = state.wifis.map(w => w.id === id ? { ...w, password } : w);
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    abrirWifi: (id) => {
        set((state) => {
            const nuevos = state.wifis.map(w => ({
                ...w,
                abierto: w.id === id,
                openPassword: false,
                passwordUsuario: w.bloqueado ? "" : w.passwordUsuario,
            }));
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    cerrarWifi: () => {
        set((state) => {
            const nuevos = state.wifis.map(w => ({
                ...w,
                abierto: false // todos cerrados
            }));
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    anotarPassword: (id, password) => {
        set((state) => {
            const nuevos = state.wifis.map(w => w.id === id ? { ...w, passwordUsuario: password } : w);
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    cambiarAutomatico: (id) => {
        set((state) => {
            const nuevos = state.wifis.map(w => w.id === id ? { ...w, automatico: !w.automatico } : w);
            saveToLocalStorage(nuevos);
            return { wifis: nuevos };
        });
    },

    wifiAbiertoAutomatico: () => {
        set((state) => {
            // Filtrar los conectados
            const conectados = state.wifis.filter(w => w.conectado);

            if (conectados.length > 0) {
                // Tomar el primero conectado
                const primerConectadoId = conectados[0].id;

                const nuevos = state.wifis.map(w => ({
                    ...w,
                    abierto: w.id === primerConectadoId
                }));

                saveToLocalStorage(nuevos);
                return { wifis: nuevos };
            } else {
                // No hay conectados, todos abiertos en false
                const nuevos = state.wifis.map(w => ({
                    ...w,
                    abierto: false
                }));

                saveToLocalStorage(nuevos);
                return { wifis: nuevos };
            }
        });
    },


}));
