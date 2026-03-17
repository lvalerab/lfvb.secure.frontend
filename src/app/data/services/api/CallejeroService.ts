import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoEntidadTerritorialModel } from "@app/data/interfaces/Callejero/TipoEntidadTerritorialModel";
import { environment } from "@environments/environment";
import { TipoViaModel } from "@app/data/interfaces/Callejero/TipoViaModel";
import { EntidadTerritorialModel } from "@app/data/interfaces/Callejero/EntidadTerritorialModel";
import { FiltroBusquedaEntidadTerritorialModel } from "@app/data/interfaces/Callejero/FiltroBusquedaEntidadTerritorialModel";
import { FiltroBusquedaCallejeroModel } from "@app/data/interfaces/Callejero/FiltroBusquedaCallejeroModel";
import { CallejeroModel } from "@app/data/interfaces/Callejero/CallejeroModel";

@Injectable({
    providedIn:'root'
})
export class CallejeroService {
    constructor(private http:HttpClient) {

    }

    ListaTiposEntidadesTerritoriales():Observable<TipoEntidadTerritorialModel[]> {
        return this.http.get<TipoEntidadTerritorialModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.vias.entidad.territorial.tipo}`);
    }

    ListaTiposVias():Observable<TipoViaModel[]> {
        return this.http.get<TipoViaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.vias.callejero.vias.tipos}`);
    }

    GetEntidad(id:string):Observable<EntidadTerritorialModel> {
        return this.http.get<EntidadTerritorialModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.vias.entidad.territorial.busqueda}`);
    }

    BuscarEntidadesTerritoriales(filtro:FiltroBusquedaEntidadTerritorialModel):Observable<EntidadTerritorialModel[]> {
        return this.http.post<EntidadTerritorialModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.vias.entidad.territorial.busqueda}`,filtro);
    }

    BuscarVias(filtro:FiltroBusquedaCallejeroModel):Observable<CallejeroModel[]> {
        return this.http.post<CallejeroModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.vias.callejero.vias.buscar}`,filtro);
    }
}