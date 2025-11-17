import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoElementoModel } from "@app/data/interfaces/TipoElementoModel";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn:'root'
    }
)
export class CoreService {
    constructor(private http:HttpClient) {

    }

    TiposElementosLista():Observable<TipoElementoModel[]> {
        return this.http.get<TipoElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.core.elementos.tipos.lista}`);
    }
}