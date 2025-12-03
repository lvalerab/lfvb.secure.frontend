import { AccionModel } from "../Acciones/AccionModel";
import { CircuitoModel } from "../Circuitos/CircuitoModel";
import { PasoModel } from "./PasoModel";

export interface AccionPasoModel {
    id:number|null,
    paso:PasoModel,
    tipoEjecucion:string,
    orden:number,
    accion:AccionModel,
    circuitoError:CircuitoModel|null
}