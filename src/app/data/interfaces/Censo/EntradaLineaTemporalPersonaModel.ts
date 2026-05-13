import { RelacionPersonaModel } from "./RelacionPersonaModel";
import { SituacionPersonaModel } from "./SituacionPersonaModel";

export interface EntradaLineaTemporalPersonaModel {
    fecha:Date|undefined|null,
    titulo:string|undefined|null,
    situacion:SituacionPersonaModel|undefined|null,
    relacion:RelacionPersonaModel|undefined|null
}