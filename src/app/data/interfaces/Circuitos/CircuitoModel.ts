import { TramiteModel } from "./TramiteModel";

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
}