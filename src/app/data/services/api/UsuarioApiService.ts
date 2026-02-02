import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '@data/interfaces/LoginModel';
import { TokenModel } from '@data/interfaces/TokenModel';
import { AplicacionModel } from '@data/interfaces/AplicacionModel';
import { ElementoModel } from '@data/interfaces/ElementoModel';
import {BrowserCacheService} from "@data/services/data/BrowserCacheService";
import { Observable } from 'rxjs';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import {ConsultaPermisoModel} from '@data/interfaces/PermisoElemento/ConsultaPermisoModel';

@Injectable({
    providedIn:'root'
})
export class UsuarioApiService {
    constructor(private http:HttpClient, private cache:BrowserCacheService) {}

    Login(login:LoginModel):Promise<TokenModel> {
        return new Promise((accept,reject)=>{
            this.http.post<TokenModel>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.login}`,login).subscribe((token:TokenModel)=>{
                accept(token);
            },(error:any)=>{
                reject(error);
            });
        });
    }

    Maquina(token:string):Observable<TokenModel> {
        return this.http.post<TokenModel>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.maquina}`,token);
    }

    Guid():Observable<string> {
        return this.http.get<string>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.guid}`);
    }

    Aplicaciones():Observable<AplicacionModel[]> {
        return this.http.get<AplicacionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.permisos.aplicaciones.usuario}`);
    }

    Usuario():Observable<UsuarioModel> {
        return this.http.get<UsuarioModel>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.usuario}`);
    }

    Elementos():Observable<ElementoModel[]> {
        return this.http.get<ElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.permisos.elementos.usuario}`);
    }

    PuedeActuarSobre(idElemento:string):Observable<boolean> {
        return this.http.get<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.permisos.elementos.puede.actuar.replace('{idElemento}',idElemento)}`);
    }

    PermisoSobre(codApli:string, codElemento:string, permiso:string):Observable<ConsultaPermisoModel> {
        return this.http.get<ConsultaPermisoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.permisos.codigos.puede.actuar}`.replace(':codApli',codApli).replace(':codElemento',codElemento).replace(':codTipo',permiso));
    }
}