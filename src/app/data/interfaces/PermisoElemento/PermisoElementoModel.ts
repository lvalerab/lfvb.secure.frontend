import { ElementoAplicacionModel } from "../ElementoAplicacionModel";
import { GrupoModel } from "../GrupoModel";
import { TipoPermisoElementoModel } from "./TipoPermisoElementoModel";

export interface PermisoElementoModel {
    grupo:GrupoModel,
    elemento:ElementoAplicacionModel,
    tipoPermiso:TipoPermisoElementoModel
}