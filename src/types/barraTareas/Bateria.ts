export enum EnumModoRendimiento {
    MaximaDuracion = "Maxima Duracion",
    MaximoRendimiento = "Maximo Rendimiento",
    Equilibrado = "Equilibrado",
}



export interface Rendimiento {
    id: number;
    modo: EnumModoRendimiento;
    active: boolean;
    value: number;
}