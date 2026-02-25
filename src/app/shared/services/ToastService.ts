import { Injectable, WritableSignal, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

interface MensajeToast {
    tipo:string;
    titulo:string;
    detalle:string;
}

@Injectable({
    providedIn:'root'
})
export class ToastService {
    public mensaje:WritableSignal<MensajeToast|null>=signal(null);
    public obs:Observable<MensajeToast|null>=toObservable(this.mensaje);

    public PilaMensajes:MensajeToast[]=[];
    public indicePila:WritableSignal<number>=signal(0);
    public errores:WritableSignal<number>=signal(0);
    public warnings:WritableSignal<number>=signal(0);
    public infos:WritableSignal<number>=signal(0);
    
    constructor() {
        toObservable(this.mensaje).subscribe((mensaje)=> {            
            if(mensaje) {
                this.PilaMensajes[this.indicePila()]=mensaje;
                if(this.indicePila()>=environment.config.toast.pila.maxItems) {
                    for(var i=0;i<this.indicePila();i++) {
                        this.PilaMensajes[i]=this.PilaMensajes[i+1];
                    }                
                } else {
                    this.indicePila.set(this.indicePila()+1);
                }
                switch(mensaje.tipo) {
                    case "error":
                        this.errores.set(this.errores()+1);
                        break;
                    case "warn":
                        this.warnings.set(this.warnings()+1);
                        break;
                    default:
                        this.infos.set(this.infos()+1);
                        break;
                }
            }
        });
    }
}