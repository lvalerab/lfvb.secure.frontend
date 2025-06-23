import { TipoElementoAplicacionModel } from "../TipoElementoAplicacionModel";

export interface AltaElementoAplicacionModel {
    codigo:string;        
    tipoElemento:TipoElementoAplicacionModel
    nombre:string;
    elementos:AltaElementoAplicacionModel
}