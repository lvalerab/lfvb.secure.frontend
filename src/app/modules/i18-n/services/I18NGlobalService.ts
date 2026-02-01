import { Injectable, WritableSignal, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { IdiomaModel } from "@app/data/interfaces/i18N/IdiomaModel";
import { i18NService } from "@app/data/services/api/i18NService";
import { PropiedadesApiService } from "@app/data/services/api/PropiedadesApiService";
import { AuthService } from "@app/shared/services/AuthService";
import { ToastService } from "@app/shared/services/ToastService";
import { Observable } from "rxjs";
import { constantes } from "src/const/constantes";


@Injectable(
    {
        providedIn:'root'
    }
)
export class I18NGlobalService {
    
    idioma:WritableSignal<IdiomaModel|null>=signal(null);

    OnCambiaIdioma=toObservable(this.idioma);
    
    constructor(private i18NServ:i18NService,
                private authServ:AuthService,
                private propServ:PropiedadesApiService,
                private msg:ToastService
    ) {
        /////////////////////////////////////////////////////////////////
        //Para detectar el login del usuario
        ////////////////////////////////////////////////////////////////
        toObservable(authServ.usuario).subscribe((user)=>{
            //Obtenemos las propiedades del usuario
            if(user && this.authServ.isAuthenticated()) {
                this.propServ.PropiedadesElemento(user.id??constantes.guid.zero,"USER_IDIO").subscribe((values)=>{
                    if(values.length>0 && values[0].valores && values[0].valores.length>0) {
                        this.i18NServ.Detalle(values[0].valores[0].texto??"").subscribe({
                            next:(idioma)=>{
                                if(this.idioma()?.codigo!=idioma.codigo) {
                                    this.idioma.set(idioma);
                                    this.msg.mensaje.set({tipo:"info",titulo:"Estableciendo idioma usuario",detalle:"Se han establecido las opciones del usuario"});
                                }
                            },
                            error:(error)=>{
                                this.msg.mensaje.set({tipo:"error",titulo:"Estableciendo idioma usuario",detalle:`No se ha podido establecer el idioma del usuario, causa: ${error.message}`});
                            }
                        });
                    }
                });
            }
        });
    }

    translate(pagina:string, texto:string) {
        
    }
}