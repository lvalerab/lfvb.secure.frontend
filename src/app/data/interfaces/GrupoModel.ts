import { AplicacionModel } from "./AplicacionModel";

export interface GrupoModel {
    id:string|null;
    usuarioId:string|null;
    nombre:string|null;
    aplicacion:AplicacionModel|null;
}