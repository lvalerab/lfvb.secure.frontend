import { TipoRelacionPersonaModel } from "./TipoRelacionPersonaModel";

export interface RelacionPersonaModel {
    id:string|null|undefined,
    tipo:TipoRelacionPersonaModel|null|undefined,
    persona1:null|undefined,
    persona2:null|undefined,
    observaciones:string|null|undefined,
    fechaInicioVigencia:Date|null|undefined,
    fechaFinVigencia:Date|null|undefined
}