import { EntidadTerritorialModel } from "./EntidadTerritorialModel";
import { TipoViaModel } from "./TipoViaModel";

export interface CallejeroModel {
    id:string|null;
    tipoVia:TipoViaModel|null;
    entidadTerritorial:EntidadTerritorialModel|null;
    nombre:string|null;

    calleSuperior:CallejeroModel|null;
    callesInferiores:CallejeroModel[]|null;
}