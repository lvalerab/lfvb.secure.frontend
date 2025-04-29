import {AuthService} from '../services/AuthService';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(this.auth.isAuthenticated()) {
            const authToken=this.auth.getAuthorizationToken();

            const authReq=req.clone({
                headers: req.headers.set('Authorization',`Bearer ${authToken}`)
            });
            return next.handle(authReq);
        } else {
            const sinAuthReq=req.clone();
            return next.handle(sinAuthReq);
        }
    }
}