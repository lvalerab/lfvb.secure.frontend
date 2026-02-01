import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstadoElementoModel } from "@app/data/interfaces/EstadoElemento/EstadoElementoModel";
import { NucleoModel } from "@app/data/interfaces/Nucleo/NucleoModel";
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

    IdentificadorNucleo():Observable<NucleoModel> {
        return this.http.get<NucleoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.core.nucleo.ident}`);
    }

    TiposElementosLista():Observable<TipoElementoModel[]> {
        return this.http.get<TipoElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.core.elementos.tipos.lista}`);
    }

    EstadosElementosLista():Observable<EstadoElementoModel[]> {
        return this.http.get<EstadoElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.core.elementos.estados.lista}`);
    }
}