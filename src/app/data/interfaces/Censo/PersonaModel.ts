import { IdentificacionPersonaModel } from "./IdentificacionPersonaModel";
import { RelacionPersonaModel } from "./RelacionPersonaModel";
import { SituacionPersonaModel } from "./SituacionPersonaModel";
import { TipoPersonaModel } from "./TipoPersonaModel";
import { TipoSexoPersonaModel } from "./TipoSexoPersonaModel";

export interface PersonaModel {
    id:string|null|undefined,
    tipo:TipoPersonaModel|null|undefined,
    sexo:TipoSexoPersonaModel|null|undefined,
    nombre:string|null|undefined,
    apellido1:string|null|undefined,
    apellido2:string|null|undefined,
    fechaNacimiento:Date|null|undefined,
    identificaciones:IdentificacionPersonaModel[]|null|undefined,
    situaciones:SituacionPersonaModel[]|null|undefined,
    relaciones:RelacionPersonaModel[]|null|undefined,
    seleccionado:boolean|null|undefined
}