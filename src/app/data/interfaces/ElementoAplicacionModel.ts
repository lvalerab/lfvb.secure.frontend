import { AplicacionModel } from "./AplicacionModel";
import { TipoElementoAplicacionModel } from "./TipoElementoAplicacionModel";

export interface ElementoAplicacionModel {
    id:string|null;
    codigo:string|null;
    padre:ElementoAplicacionModel|null;
    aplicacion:AplicacionModel|null;
    tipoElemento:TipoElementoAplicacionModel|null;
    nombre:string|null;
    elementos:ElementoAplicacionModel[]|null;
}