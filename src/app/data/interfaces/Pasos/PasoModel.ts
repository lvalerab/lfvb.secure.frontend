import { CircuitoModel } from "../Circuitos/CircuitoModel";
import { TramiteModel } from "../Circuitos/TramiteModel";
import { EstadoElementoModel } from "../EstadoElemento/EstadoElementoModel";

export interface PasoModel {
    id:string|null;
    tramite:TramiteModel|null;
    nombre:string|null;
    estado:EstadoElementoModel|null;
    estadoNuevo:EstadoElementoModel|null;
    circuitoSiguiente:CircuitoModel|null;
    pasosSiguientes:string[]|null
}