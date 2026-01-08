import { EstadoElementoModel } from "./EstadoElemento/EstadoElementoModel";
import { PasoModel } from "./Pasos/PasoModel";
import { TipoElementoModel } from "./TipoElementoModel";

export interface EstadoEsperadoPaso {
    paso:PasoModel,
    tipoElemento:TipoElementoModel,
    estado:EstadoElementoModel,
    tipoEstadoEsperado:string
}