import { TipoRelacionPersonaModel } from "./TipoRelacionPersonaModel";

export interface CmdRelacionPersonaModel {
    idPersona1:string|undefined|null,
    idPersona2:string|undefined|null,
    tipo:TipoRelacionPersonaModel|undefined|null,
    fechaInicio:Date|undefined|null,
    fechaFin:Date|undefined|null,
    observaciones:string|undefined|null
}