import { CallejeroModel } from "./CallejeroModel";
import { EntidadTerritorialModel } from "./EntidadTerritorialModel";
import { TipoViaModel } from "./TipoViaModel";

export interface FiltroBusquedaCallejeroModel {
    entidadesTerritoriales:EntidadTerritorialModel[]|null;
    tiposVia:TipoViaModel[]|null;
    nombre:string|null;

    callesSuperiores:CallejeroModel[]|null;
    callesInferiores:CallejeroModel[]|null;
}