import { AplicacionModel } from "./AplicacionModel";
import { UsuarioModel } from "./UsuarioModel";

export interface GrupoModel {
    id:string|null;
    usuarioId:string|null;
    nombre:string|null;
    aplicacion:AplicacionModel|null;
    usuarios:UsuarioModel[]|null;
}