import { TipoPropiedadModel } from "./TipoPropiedadModel";

export interface PropiedadModel {
    codigo:string|null;
    tipoPropiedad:TipoPropiedadModel|null;
    nombre:string|null;
    propiedades:PropiedadModel[]|null    
}