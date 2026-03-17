import { EntidadTerritorialModel } from "./EntidadTerritorialModel";
import { TipoEntidadTerritorialModel } from "./TipoEntidadTerritorialModel";

export interface FiltroBusquedaEntidadTerritorialModel {
    tiposEntidades:TipoEntidadTerritorialModel[]|null;
    padres:EntidadTerritorialModel[]|null;
    nombre:string|null;
}