import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoUnidadOrganizativaModel } from "@app/data/interfaces/UnidadesOrganizativas/TipoUnidadOrganizativaModel";
import { UnidadOrganizativaModel } from "@app/data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AdministracionUnidadesOrganizativasServices {
    constructor(private http:HttpClient) {

    }

    AltaTipoUnidadOrganizativa(tipo:TipoUnidadOrganizativaModel):Observable<TipoUnidadOrganizativaModel> {
        return this.http.post<TipoUnidadOrganizativaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.modulos.unidadesAdministrativas.tipos.alta}`,tipo);
    }

    ModificarTipoUnidadOrganizativa(tipo:TipoUnidadOrganizativaModel):Observable<TipoUnidadOrganizativaModel> {
        return this.http.put<TipoUnidadOrganizativaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.modulos.unidadesAdministrativas.tipos.modificacion}`,tipo);
    }

    AltaUnidadOrganizativa(unor:UnidadOrganizativaModel):Observable<UnidadOrganizativaModel> {
        return this.http.post<UnidadOrganizativaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.modulos.unidadesAdministrativas.alta}`,unor);
    }

    ModificarUnidadOrganizativa(unor:UnidadOrganizativaModel):Observable<UnidadOrganizativaModel> {
        return this.http.put<UnidadOrganizativaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.modulos.unidadesAdministrativas.modificacion}`,unor);
    }
}