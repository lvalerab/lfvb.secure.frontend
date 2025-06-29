import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AplicacionModel } from "@app/data/interfaces/AplicacionModel";
import { environment } from "@environments/environment";
import { TipoElementoAplicacionModel } from "@app/data/interfaces/TipoElementoAplicacionModel";
import { AltaAplicacionModel } from "@app/data/interfaces/AltaAplicacionModel/AltaAplicacionModel";
import { ElementoAplicacionModel } from "@app/data/interfaces/ElementoAplicacionModel";
import { PermisoElementoModel } from "@app/data/interfaces/PermisoElemento/PermisoElementoModel";
import { TipoPermisoElementoModel } from "@app/data/interfaces/PermisoElemento/TipoPermisoElementoModel";
import { AltaPermisoModel } from "@app/data/interfaces/PermisoElemento/AltaPermisoModel";

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

    Alta(aplicacion:AltaAplicacionModel):Observable<AplicacionModel> {
        return this.http.post<AplicacionModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.alta}`,aplicacion);
    }

    Actualiza(aplicacion:AplicacionModel):Observable<AplicacionModel> {
        return this.http.put<AplicacionModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.alta}`,aplicacion);
    }

    ElementosArbol(id:string) {
        return this.http.get<ElementoAplicacionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.lista.replace('{id}',id)}`);
    }

    ElementosTipos():Observable<TipoElementoAplicacionModel[]> {        
        return this.http.get<TipoElementoAplicacionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.tipos}`);
    }

    ElementoAlta(elemento:ElementoAplicacionModel):Observable<ElementoAplicacionModel> {
        return this.http.post<ElementoAplicacionModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.alta}`,elemento);
    }

    ElementoActualizar(elemento:ElementoAplicacionModel):Observable<ElementoAplicacionModel> {
        return this.http.put<ElementoAplicacionModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.actualizar}`,elemento);
    }

    ElementoPermisos(idAplicacion:string, idGrupo:string):Observable<PermisoElementoModel[]> {
        return this.http.get<PermisoElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.permisos.replace('{idAplicacion}',idAplicacion).replace('{idGrupo}',idGrupo)}`);
    }

    TipoPermisoPorTipoElemento(codTipo:string):Observable<TipoPermisoElementoModel[]> {
        return this.http.get<TipoPermisoElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.tipoPermisos.replace('{codigoTipo}',codTipo)}`);
    }

    AltaElementoPermiso(data:AltaPermisoModel):Observable<AltaPermisoModel> {
        return this.http.post<AltaPermisoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.aplicaciones.elementos.alta_permiso}`,data);
    }
}