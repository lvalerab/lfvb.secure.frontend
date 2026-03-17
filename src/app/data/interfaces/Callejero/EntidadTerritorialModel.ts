import { TipoEntidadTerritorialModel } from "./TipoEntidadTerritorialModel";

export interface EntidadTerritorialModel {
    id:string|null;
    padre:EntidadTerritorialModel|null;
    tipo:TipoEntidadTerritorialModel|null;
    nombre:string|null;
}