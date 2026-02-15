import { CampoColeccionTextoModel } from "./CampoColeccionTextoModel";

export interface ColeccionTextoModel {
    id:string|undefined;
    nombre:string|undefined;
    detalle:string|undefined;
    Campos:CampoColeccionTextoModel[]|undefined;
}