import {Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '@app/data/interfaces/LoginModel';
import { TokenModel } from '@app/data/interfaces/TokenModel';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class UsuarioApiService {
    constructor(private http:HttpClient) {}

    Login(login:LoginModel):Observable<TokenModel> {        
        return this.http.post<TokenModel>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.login}`,login);
    }

    Maquina(token:string):Observable<TokenModel> {
        return this.http.post<TokenModel>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.maquina}`,token);
    }

    Guid():Observable<string> {
        return this.http.get<string>(`${environment.api.auth.base}${environment.api.auth.rutas.usuario.guid}`);
    }
}