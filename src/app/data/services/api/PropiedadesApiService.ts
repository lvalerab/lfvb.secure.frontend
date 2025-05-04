import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import {TipoPropiedadModel} from '@data/interfaces/TipoPropiedadModel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class PropiedadesApiService {
    constructor(private http:HttpClient) {

    }

    Tipos():Observable<TipoPropiedadModel[]> {
        return this.http.get<TipoPropiedadModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.tipos}`);
    }

}