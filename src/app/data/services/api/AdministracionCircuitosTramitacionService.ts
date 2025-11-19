import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { TramiteModel } from "@data/interfaces/Circuitos/TramiteModel";
import { CircuitoModel } from "@data/interfaces/Circuitos/CircuitoModel";
import { FiltroCircuitoModel } from "@data/interfaces/Circuitos/FiltroCircuitoModel";
import { AltaCircuitoModel } from "@app/data/interfaces/Circuitos/AltaCircuitoModel";
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

    public AltaTramite(tramite:TramiteModel):Observable<TramiteModel|null> {
        return this.http.post<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.alta}`,tramite);
    }

    public ModificaTramite(tramite:TramiteModel):Observable<TramiteModel|null> {
        return this.http.put<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.modifica}`,tramite);
    }


    public ListaCircuitos(filtro:FiltroCircuitoModel):Observable<CircuitoModel[]|null> {
        return this.http.post<CircuitoModel[]|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.lista}`,filtro);
    }

    public NuevoCircuito(circuito:AltaCircuitoModel):Observable<AltaCircuitoModel> {
        return this.http.post<AltaCircuitoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.nuevo}`,circuito);
    }
}