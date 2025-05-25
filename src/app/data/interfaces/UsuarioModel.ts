import { CredencialUsuarioModel } from "./CredencialUsuarioModel";
import { GrupoModel } from "./GrupoModel";

export interface UsuarioModel {
    loggeado:boolean;
    id:string|undefined;
    usuario:string|undefined;
    nombre:string|undefined;
    apellido1:string|undefined;
    apellido2:string|undefined;
    token:string|undefined;
    credenciales:CredencialUsuarioModel[]|undefined;
    grupos:GrupoModel[]|undefined;
}