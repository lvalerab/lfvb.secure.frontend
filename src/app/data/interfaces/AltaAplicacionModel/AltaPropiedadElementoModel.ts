import { PropiedadModel } from "../PropiedadModel";
import { AltaValorPropiedadModel } from "./AltaValorPropiedadModel";

export interface AltaPropiedadElementoModel {
    propiedad:PropiedadModel,
    valores:AltaValorPropiedadModel[]
}