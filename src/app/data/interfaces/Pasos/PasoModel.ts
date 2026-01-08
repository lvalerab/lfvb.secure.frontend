import { BandejaModel } from "../Bandejas/BandejaModel";
import { CircuitoModel } from "../Circuitos/CircuitoModel";
import { TramiteModel } from "../Circuitos/TramiteModel";
import { EstadoElementoModel } from "../EstadoElemento/EstadoElementoModel";
import { EstadoEsperadoPaso } from "../EstadoEsperadoPaso";
import { GrupoModel } from "../GrupoModel";
import { UsuarioModel } from "../UsuarioModel";

export interface PasoModel {
    id:string|null;
    tramite:TramiteModel|null;
    circuito:CircuitoModel|null;
    nombre:string|null;
    estado:EstadoElementoModel|null;
    estadoNuevo:EstadoElementoModel|null;
    estadosEsperados:EstadoEsperadoPaso[],
    circuitoSiguiente:CircuitoModel|null;
    bandeja:BandejaModel|null;
    pasosSiguientes:string[]|null,
    gruposTramitadores:GrupoModel[],
    usuariosTramitadores:UsuarioModel[]
}