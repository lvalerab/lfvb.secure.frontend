import { AltaElementoAplicacionModel } from "./AltaElementoAplicacionModel";
import { AltaGrupoModel } from "./AltaGrupoModel";
import { AltaPropiedadElementoModel } from "./AltaPropiedadElementoModel";

export interface AltaAplicacionModel {
    codigo:string;
    nombre:string;
    propiedades:AltaPropiedadElementoModel[];
    grupos:AltaGrupoModel[];
    elementos:AltaElementoAplicacionModel[]
}