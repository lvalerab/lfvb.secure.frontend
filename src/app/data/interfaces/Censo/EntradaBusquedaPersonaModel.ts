import { IdentificacionPersonaModel } from "./IdentificacionPersonaModel";

export interface EntradaBusquedaPersonaModel {
    id:string|null|undefined,
    nombre:string|null|undefined,
    apellido1:string|null|undefined,
    apellido2:string|null|undefined,
    identificaciones:IdentificacionPersonaModel[]|null|undefined
}