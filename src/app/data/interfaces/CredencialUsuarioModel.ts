import { TipoCredencialModel } from "./TipoCrendencialModel";

export interface CredencialUsuarioModel {
    id:string|null,
    idUsuario:string|null,
    tipo:TipoCredencialModel|null,
    desde:Date|null,
    hasta:Date|null
}