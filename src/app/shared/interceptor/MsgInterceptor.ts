import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "../services/ToastService";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class MsgInterceptor implements HttpInterceptor {
    constructor(private msg:ToastService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(            
            catchError((error:HttpErrorResponse)=>{                
                switch(error.status) {                                        
                    case 401:
                        this.msg.mensaje.set({tipo:"error",titulo:"Usuario sin permisos o sin usuario identificado", detalle:"El usuario actual no tiene permisos para esta acción"});
                        break;
                    case 404:
                        this.msg.mensaje.set({tipo:"error",titulo:"Recurso no encontrado",detalle:`El recurso solicitado no existe`});
                        break;
                    case 500:
                        this.msg.mensaje.set({tipo:"error",titulo:"Error del servidor",detalle:`La petición realizada al servidor ha devuelto el siguiente mensaje: ${error.statusText}`});
                        break;
                }
                if(error.status===401) {
                    
                }
                return throwError(()=>error);
            })
        )
    }
}