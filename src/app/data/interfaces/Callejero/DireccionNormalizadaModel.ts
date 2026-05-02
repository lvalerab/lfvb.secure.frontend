import { CallejeroModel } from "./CallejeroModel";

export interface DireccionNormalizadaModel {
    calle:CallejeroModel|null|undefined;
    edificio:string|null|undefined;
    numero:string|null|undefined;
    puerta:string|null|undefined;
    piso:string|null|undefined;
    escalera:string|null|undefined;
    bloque:string|null|undefined;
    ampliacion:string|null|undefined;
}