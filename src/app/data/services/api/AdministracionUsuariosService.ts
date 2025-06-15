import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioModel } from "@data/interfaces/UsuarioModel";
import { TipoCredencialModel} from "@data/interfaces/TipoCrendencialModel";
import { environment } from "@environments/environment";
import { GrupoModel } from "@app/data/interfaces/GrupoModel";
import { CredencialUsuarioModel } from "@data/interfaces/CredencialUsuarioModel";
import { AltaUsuarioModel } from "@app/data/interfaces/AltaUsuarioModel";
import { AdministracionGruposPermisosService } from "./AdministracionGruposPermisosService";

@Injectable({
    providedIn:'root'
})
export class AdministracionUsuariosService {
    constructor(private http:HttpClient,
                private grupoAdmServ:AdministracionGruposPermisosService
    ) {

    }

    Lista(pagina:number,elementos:number):Observable<UsuarioModel[]> {
        return this.http.get<UsuarioModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.lista.replace('{pagina}',pagina+'').replace('{elementos}',elementos+'')}`);
    }

    Usuario(id:string) {
        return this.http.get<UsuarioModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.usuario.replace('{id}',id)}`);
    }

    TiposCredencialesLista():Observable<TipoCredencialModel[]> {
        return this.http.get<TipoCredencialModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.credenciales.tipos.lista}`);
    }

    RevocarTipoCrendencial(idUsuario:string, codigo:string):Observable<number> {
        return this.http.get<number>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.credenciales.revocar.replace('{id}',idUsuario).replace('{codigo}',codigo)}`);
    }

    GruposLista():Observable<GrupoModel[]> {
        //return this.http.get<GrupoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.grupos.lista}`);
        return this.grupoAdmServ.Lista();
    }

    GruposUsuarioLista(id:string) {
        return this.http.get<GrupoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.grupos.lista.replace('{id}',id)}`);
    }

    CredencialesUsuarioLista(id:string) {
        return this.http.get<CredencialUsuarioModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.credenciales.lista.usuario.replace('{id}',id)}`);
    }

    AltaUsuario(datos:AltaUsuarioModel) {
        return this.http.post<AltaUsuarioModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.alta}`,datos);
    }

    ActualizaUsuario(datos:UsuarioModel) {
        return this.http.put<UsuarioModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.actualiza}`,datos);
    }


    AgregarGruposUsuario(id:string, idGrupos:string[]) {
        return this.http.post<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.grupos.agregar.replace(`id`,id)}`,idGrupos);
    }

    QuitarGruposUsuario(id:string, idGrupos:string[]) {
        return this.http.post<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.usuarios.grupos.quitar.replace(`id`,id)}`,idGrupos);
    }
}