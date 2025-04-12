//Aqui declaramos todos los interceptores que hay para las peticiones http

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import {AuthInterceptor} from "./AuthInterceptor";


export const httpInterceptorProviders=[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
]
