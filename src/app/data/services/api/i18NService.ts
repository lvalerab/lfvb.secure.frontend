import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IdiomaModel} from "@data/interfaces/i18N/IdiomaModel";
import { environment } from "@environments/environment";
import { ColeccionTextoModel } from "@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel";
import { CampoColeccionTextoModel } from "@app/data/interfaces/i18N/Colecciones/CampoColeccionTextoModel";
import {OpcionCampoColeccionTextoModel} from "@data/interfaces/i18N/Colecciones/OpcionCampoColeccionTextoModel";

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

    Ident(codIdioma:string):Observable<string> {
        return this.http.get<string>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.ident}`.replace(":codigoIdioma",codIdioma));
    }

    ListaTodos():Observable<IdiomaModel[]> {
        return this.http.get<IdiomaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.listaTodos}`);
    }

    Alta(idioma:IdiomaModel):Observable<IdiomaModel> {
        return this.http.post<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.alta}`,idioma);
    }

    Modifica(idioma:IdiomaModel):Observable<IdiomaModel> {
        return this.http.put<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.modificar}`,idioma);
    }

    ColeccionesLista():Observable<ColeccionTextoModel[]> {
        return this.http.get<ColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.lista}`);
    }

    Coleccion(id:string):Observable<ColeccionTextoModel> {
        return this.http.get<ColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.detalle}`.replace(':id',id));
    }

    ColeccionCampos(id:string):Observable<CampoColeccionTextoModel[]> {
        return this.http.get<CampoColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.lista}`.replace(':id',id));
    }

    ColeccionCampo(idCampo:string,id:string):Observable<CampoColeccionTextoModel[]> {
        return this.http.get<CampoColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.detalle}`.replace(':idCampo',idCampo).replace(':id',id));
    }

    ColeccionCampoOpciones(idCampo:string, id:string):Observable<OpcionCampoColeccionTextoModel[]> {
        return this.http.get<OpcionCampoColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.opciones.lista}`.replace(':idCampo',idCampo).replace(':id',id));
    }

    ColeccionCampoOpcion(idOpcion:string, idCampo:string, id:string):Observable<OpcionCampoColeccionTextoModel> {
        return this.http.get<OpcionCampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.opciones.lista}`.replace(':idOpcion',idOpcion).replace(':idCampo',idCampo).replace(':id',id));
    }
}