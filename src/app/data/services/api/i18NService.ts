import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IdiomaModel} from "@data/interfaces/i18N/IdiomaModel";
import { environment } from "@environments/environment";

@Injectable(
    {
        providedIn:'root'
    }
)
export class i18NService {
    constructor(private http:HttpClient) {

    }

    Lista():Observable<IdiomaModel[]> {
        return this.http.get<IdiomaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.lista}`);
    }

    Detalle(codIdioma:string):Observable<IdiomaModel> {
        return this.http.get<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.detalle}`.replace(":codigoIdioma",codIdioma));
    }
}