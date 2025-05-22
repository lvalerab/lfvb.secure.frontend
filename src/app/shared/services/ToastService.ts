import { Injectable, WritableSignal, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
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
}