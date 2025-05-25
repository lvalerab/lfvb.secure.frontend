import { Injectable, WritableSignal, signal } from "@angular/core";
import { UsuarioModel } from "@app/data/interfaces/UsuarioModel";
import { UsuarioApiService } from "@app/data/services/api/UsuarioApiService";
import { BrowserCacheService } from "@data/services/data/BrowserCacheService";
import { ToastService } from "./ToastService";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    useSignal:boolean=true;

    public usuarioInvitado:UsuarioModel={ 
                                    loggeado:false, 
                                    id:"",
                                    usuario:"",
                                    nombre:"Invitado",
                                    apellido1:"",
                                    apellido2:"",
                                    token:"",
                                    credenciales:[],
                                    grupos:[]
                                    };

    token:WritableSignal<string | null>=signal(null);
    usuario:WritableSignal<UsuarioModel|null>=signal(null);

    constructor(private cache:BrowserCacheService, 
                private usrServ:UsuarioApiService,
                private msg:ToastService) {
        ///this.token.set(null);
        console.log('llama al constructor');
    }

    login(inputToken:string) {
        if(this.useSignal) {
            console.log(`INPUT TOKEN ${inputToken}`);
            this.token.set(inputToken);
            this.usrServ.Usuario().subscribe(user=>
                {
                    user.loggeado=true;
                    this.usuario.set(user);
                },
                error=>{
                    this.msg.mensaje.set({tipo:'error',titulo:'Datos del usuario actual',detalle:'No se ha podido obtener los datos del usuario actual'});
                }  
            );
        } else {
            this.cache.Set("token",inputToken);
        }
    }

    getAuthorizationToken():string | null { 
        if(this.useSignal) {       
            let aux:string | null=this.token();
            return aux;
        } else {
            return this.cache.Get("token");    
        }
    }

    isAuthenticated() {
        let aux:string|null;
        if(this.useSignal) {
            aux=this.token();
        } else  {
            aux=this.cache.Get("token");
        }
        console.log(`TOKEN: ${aux}`);
        return aux!==null;
    }

    logout() {
        if(this.useSignal) {
            console.log('Llama a logout');
            this.token.set(null);
            this.usuario.set(this.usuarioInvitado);
        } else {
            this.cache.Del("token");
        }
    }
}