import { DireccionNoNormalizadaModel } from "./DireccionNoNormalizadaModel";
import { DireccionNormalizadaModel } from "./DireccionNormalizadaModel";

export interface DireccionModel {
    id:string|null|undefined;
    normalizada:DireccionNormalizadaModel|null|undefined;
    noNormalizada:DireccionNoNormalizadaModel|null|undefined;
}