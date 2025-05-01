import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '@data/interfaces/LoginModel';
import { TokenModel } from '@data/interfaces/TokenModel';
import { AplicacionModel } from '@data/interfaces/AplicacionModel';
import {BrowserCacheService} from "@data/services/data/BrowserCacheService";
import { Observable } from 'rxjs';

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
        debugger;
        return this.http.get<AplicacionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.permisos.aplicaciones.usuario}`);
    }
}