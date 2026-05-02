import { CallejeroModel } from "./CallejeroModel";
import { EntidadTerritorialModel } from "./EntidadTerritorialModel";

export interface DireccionNoNormalizadaModel {
    entidad:EntidadTerritorialModel|null|undefined;
    calle:CallejeroModel|null|undefined;
    linea1:string|null|undefined;
    linea2:string|null|undefined;
    linea3:string|null|undefined;
}