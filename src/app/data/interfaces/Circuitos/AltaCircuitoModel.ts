import { GrupoModel } from "../GrupoModel";
import { TipoElementoModel } from "../TipoElementoModel";
import { TramiteModel } from "./TramiteModel";

export interface AltaCircuitoModel {
    tramite:TramiteModel;
    nombre:string;
    descripcion:string;
    normativa:string;
    tipos:TipoElementoModel[],
    grupos:GrupoModel[]
}