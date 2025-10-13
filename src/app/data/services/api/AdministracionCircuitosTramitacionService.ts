import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { TramiteModel } from "@app/data/interfaces/Circuitos/TramiteModel";
@Injectable({
    providedIn:'root'
})
export class AdministracionCircuitosTramitacionService {
    constructor(private http:HttpClient) {

    }

    public ListaTramites():Observable<TramiteModel[]> {
        return this.http.get<TramiteModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.lista}`);
    }

    public GetTramite(id:string):Observable<TramiteModel|null> {
        return this.http.get<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.elemento}`.replace(':id',id));
    }
}