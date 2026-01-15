import { TipoUnidadOrganizativaModel } from "./TipoUnidadOrganizativaModel";

export interface UnidadOrganizativaModel {
    codigo:string|null;
    nombre:string|null;
    tipoUnidadOrganizativa:TipoUnidadOrganizativaModel|null;
    padre:UnidadOrganizativaModel|null;
    unidades:Array<UnidadOrganizativaModel>|null;
}