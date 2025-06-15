import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { GrupoModel } from "@app/data/interfaces/GrupoModel";
import { UsuarioModel } from "@app/data/interfaces/UsuarioModel";

@Injectable({
    providedIn:'root'
})
export class AdministracionGruposPermisosService {
    constructor(private http:HttpClient) {

    }

    public Lista():Observable<GrupoModel[]> {
        return this.http.get<GrupoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.grupos.lista}`);
    }

    public Ficha(id:string):Observable<GrupoModel> {
        return this.http.get<GrupoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.grupos.grupo.ficha.replace('id',id)}`);
    }

    public ListaUsuario(id:string):Observable<UsuarioModel[]> {
        return this.http.get<UsuarioModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.grupos.grupo.usuarios.replace('id',id)}`);
    }
}