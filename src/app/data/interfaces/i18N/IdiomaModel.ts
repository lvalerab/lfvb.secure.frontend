import { PropiedadElementoModel } from "../PropiedadElementoModel";

export interface IdiomaModel {
    codigo:string;
    nombre:string;
    multiple:boolean;
    orden:number|null;
    propiedades:PropiedadElementoModel[],
    componentes:IdiomaModel[]
}