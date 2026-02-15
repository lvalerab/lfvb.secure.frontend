import { TextoColumnaIdiomaModel } from "./TextoColumnaIdiomaModel";
import { TextoIdiomaModel } from "./TextoIdiomaModel";
import { VariableTextoModel } from "./VariableTextoModel";

export interface TextoModel {
    id:string|undefined;
    variables:VariableTextoModel[]|undefined;
    textos:TextoIdiomaModel[]|undefined;
    columnas:TextoColumnaIdiomaModel|undefined;
}