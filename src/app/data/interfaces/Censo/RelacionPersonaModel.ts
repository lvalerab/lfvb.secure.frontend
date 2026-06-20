import { PersonaModel } from "./PersonaModel";
import { TipoRelacionPersonaModel } from "./TipoRelacionPersonaModel";

export interface RelacionPersonaModel {
    id:string|null|undefined,
    tipo:TipoRelacionPersonaModel|null|undefined,
    persona1:PersonaModel|null|undefined,
    persona2:PersonaModel|null|undefined,
    observaciones:string|null|undefined,
    fechaInicioVigencia:Date|null|undefined,
    fechaFinVigencia:Date|null|undefined
}