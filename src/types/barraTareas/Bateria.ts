export enum ModoRendimiento {
    MaximaDuracion = "Maxima Duracion",
    MaximoRendimiento = "Maximo Rendimiento",
    Equilibrado = "Equilibrado",
}

export interface Rendimiento {
    modo: ModoRendimiento;
    active: boolean;
    value: number;
}