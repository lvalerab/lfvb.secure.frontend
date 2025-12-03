import { PasoModel } from "./PasoModel"

export interface InterseccionModel {
  inicial:PasoModel,
  final:PasoModel,
  relacionado:boolean
}