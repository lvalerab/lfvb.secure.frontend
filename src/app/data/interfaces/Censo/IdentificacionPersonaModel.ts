import { TipoIdentificacionPersonaModel } from "./TipoIdentificacionPersonaModel";
import { PersonaModel } from "./PersonaModel";

export interface IdentificacionPersonaModel {
    id:string|null|undefined,
    tipo:TipoIdentificacionPersonaModel|null|undefined,
    persona:PersonaModel|null|undefined,
    dato1:string|null|undefined,
    dato2:string|null|undefined,
    fechaInicioVigencia:Date|null|undefined,
    fechaFinVigencia:Date|null|undefined
}