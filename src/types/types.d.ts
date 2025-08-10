declare global {
    interface Array<T> {
        toSorted(compareFn: (a: T, b: T) => number): T[];
    }
}

export interface Wifi {
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