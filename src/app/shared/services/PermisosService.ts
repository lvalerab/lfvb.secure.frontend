import { Injectable, WritableSignal, signal } from "@angular/core";
import { UsuarioApiService } from "@app/data/services/api/UsuarioApiService";
import { ToastService } from "./ToastService";
import { ConsultaPermisoModel } from "@app/data/interfaces/PermisoElemento/ConsultaPermisoModel";
import { toObservable } from "@angular/core/rxjs-interop";
import { AuthService } from "./AuthService";


@Injectable({
    providedIn:'root'
})
export class PermisosService {
    Consulta:WritableSignal<ConsultaPermisoModel[]>=signal([]);
    resultado:ConsultaPermisoModel[]=[];
    Permisos:WritableSignal<ConsultaPermisoModel[]>=signal([]);
    
    
    constructor(private authSer:AuthService,
                private userSer:UsuarioApiService,
                private msg:ToastService
    ) {
        toObservable(this.authSer.usuario).subscribe((value)=>{
            this.ConsultaPermisos(this.Consulta());
        });
        toObservable(this.Consulta).subscribe((value)=> {            
            for(let i=0;i<value.length;i++) {
                this.userSer.PermisoSobre(value[i].idApli??"",value[i].idElap??"",value[i].nombre??"").subscribe({
                        next:(value)=> {
                            this.resultado.push(value);
                        },
                        error:(error)=>{
                            this.msg.mensaje.set({tipo:"error",titulo:"Obtencion del permiso",detalle:`No se puede obtener el permiso indicado`});
                        }
                    }
                );
            }
            this.Permisos.set(this.resultado);
        });        
    }  
    
    ConsultaPermisos(datos:ConsultaPermisoModel[]) {
        this.Consulta.set(datos);
    }

    PuedeVer(componente:string, permiso:string) {
        let aux=this.Permisos().filter(x=>(x.nombre??"").indexOf(componente)>=0);
        if(aux.length>0) {
        if((aux[0].codigoTipoPermiso??[]).filter(x=>x==permiso).length>0) {
            return true;
        } else {
            return false;
        }
        } else {
            return false;
        }
    }

}