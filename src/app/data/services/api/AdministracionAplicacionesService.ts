import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AplicacionModel } from "@app/data/interfaces/AplicacionModel";
import { environment } from "@environments/environment";

@Injectable({
    providedIn:'root'
})
export class AdministracionAplicacionesService {
    constructor(private http:HttpClient) {

    }

    Lista():Observable<AplicacionModel[]> {
        return this.http.get<AplicacionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.lista}`);
    }

    Aplicacion(id:string) {
        return this.http.get<AplicacionModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.aplicacion.replace('{id}',id)}`)
    }
}