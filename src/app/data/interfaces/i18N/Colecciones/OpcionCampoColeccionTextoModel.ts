import { TextoModel } from "../Textos/TextoModel";
import { CampoColeccionTextoModel } from "./CampoColeccionTextoModel";

export interface OpcionCampoColeccionTextoModel {
    id:string|undefined;
    campo:CampoColeccionTextoModel|undefined;
    texto:TextoModel|undefined;
}