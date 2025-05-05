import { PropiedadModel } from "./PropiedadModel";
import {ValorPropiedadElementoModel} from './ValorPropiedadElementoModel';

export interface PropiedadElementoModel {
    id:number|null;
    idElemento:string|null;
    propiedad:PropiedadModel|null;
    fechaValor:Date|null,
    activo:boolean,
    valores:ValorPropiedadElementoModel[]|null
}