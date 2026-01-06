import { ValorEtiquetaModel } from "./ValorEntiquetaModel";

export interface GrupoValorEtiquetaModel {
    label:string|null,
    value:string|null,
    items:ValorEtiquetaModel[]
}