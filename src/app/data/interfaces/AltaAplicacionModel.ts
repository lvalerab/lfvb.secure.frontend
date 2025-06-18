import { AplicacionModel } from "./AplicacionModel";
import { ElementoAplicacionModel } from "./ElementoAplicacionModel";
import { GrupoModel } from "./GrupoModel";
import { PropiedadElementoModel } from "./PropiedadElementoModel";
import { PropiedadModel } from "./PropiedadModel";

export interface AltaAplicacionModel {
    codigo:string|null;
    nombre:string|null;
    propiedades:PropiedadElementoModel[]|null;
    grupos:GrupoModel[]|null;
    elementos:ElementoAplicacionModel[]
}