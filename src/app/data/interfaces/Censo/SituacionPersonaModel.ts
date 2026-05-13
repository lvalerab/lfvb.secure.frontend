import { TipoSituacionPersonaModel } from "./TipoSituacionPersonaModel";

export interface SituacionPersonaModel {
    id:string|null|undefined,
    tipo:TipoSituacionPersonaModel|null|undefined,
    persona:null|undefined,
    fechaInicio:Date|null|undefined,
    fechaFin:Date|null|undefined,
    observaciones:string|null|undefined
}