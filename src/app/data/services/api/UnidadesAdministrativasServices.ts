import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoUnidadOrganizativaModel } from "@app/data/interfaces/UnidadesOrganizativas/TipoUnidadOrganizativaModel";
import { UnidadOrganizativaModel } from "@app/data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UnidadesOrganizativasServices {
    public constructor(private http:HttpClient) {

    }

    ListaTipos():Observable<TipoUnidadOrganizativaModel[]> {
        return this.http.get<TipoUnidadOrganizativaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.unidadesOrganizativas.tipos.lista}`);
    }

    Arbol(codPadre:string|null=null, codTipo:string|null=null, nivelMax:number=999):Observable<UnidadOrganizativaModel[]> {
        let params="";
        params+=(codPadre?`codPadre=${codPadre}`:'');
        params+=(params!=""?"&":"")+(codTipo?`Tipo=${codTipo}`:'');
        params+=(params!=""?"&":"")+(nivelMax?`nivelMax=${nivelMax}`:'');
        params=(params!=""?"?":"")+params;
        return this.http.get<UnidadOrganizativaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.unidadesOrganizativas.arbol}${params}`);
    }
}