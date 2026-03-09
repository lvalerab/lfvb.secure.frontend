import { Injectable, WritableSignal, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";

interface MensajeConfirm {
    target:EventTarget|undefined|null,
    icono:string|undefined,
    titulo:string,
    mensaje:string,
    textoYes:string|undefined|null,
    textoNo:string|undefined|null,
    severityYes:string|undefined|null,
    severityNo:string|undefined|null,
    funcionYes:any,
    funcionNo:any
}

@Injectable({
    providedIn:'root'
})
export class ConfirmService {
    mensaje:WritableSignal<MensajeConfirm|null>=signal(null);
    obs:Observable<MensajeConfirm|null>=toObservable(this.mensaje);
    constructor() {
        //Aqui manejamos el observable
    }
}