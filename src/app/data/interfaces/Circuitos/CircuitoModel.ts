import { TramiteModel } from "./TramiteModel";
import { TipoElementoModel } from "../TipoElementoModel";
import { GrupoModel } from "../GrupoModel";

export interface CircuitoModel {
    id:string|null;
    tramite:TramiteModel|null;
    nombre:string|null;
    descripcion:string|null;
    normativa:string|null;
    activo:boolean|null;
    fechaAlta:Date|null;
    fechaModificacion:Date|null;
    fechaBaja:Date|null;
    tipos:TipoElementoModel[];
    grupos:GrupoModel[];
}