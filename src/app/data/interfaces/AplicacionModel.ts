import { ElementoAplicacionModel } from "./ElementoAplicacionModel";
import { GrupoModel } from "./GrupoModel";

export interface AplicacionModel {
    id:string|null;
    codigo:string|null;
    nombre:string|null;
    elementos:ElementoAplicacionModel[]|null;
    grupos:GrupoModel[]|null;
}