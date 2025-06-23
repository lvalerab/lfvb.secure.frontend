import { Component, WritableSignal,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionGruposPermisosService } from '@app/data/services/api/AdministracionGruposPermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { error } from 'console';
import { toObservable } from '@angular/core/rxjs-interop';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ficha-grupo-permisos',
  standalone: false,
  templateUrl: './ficha-grupo-permisos.component.html',
  styleUrl: './ficha-grupo-permisos.component.less'
})
export class FichaGrupoPermisosComponent {

    grupo:WritableSignal<GrupoModel|null>=signal(null);
    usuariosSistema:UsuarioModel[]=[];
    usuariosGrupo:UsuarioModel[]=[];
    
    obsGrupo:Observable<GrupoModel|null>=toObservable(this.grupo);

    constructor(private admGrupSer:AdministracionGruposPermisosService,
                private admUsrSer:AdministracionUsuariosService,
                private msg:ToastService,
                private rutaActual:ActivatedRoute
    ) {

    }

    ngOnInit() {      
      this.obsGrupo.subscribe((valor:GrupoModel|null)=>this.OnCuandoSetGrupo(valor));
      this.rutaActual.paramMap.subscribe(params=>{
        var id=params.get("id");
        this.admGrupSer.Ficha(id??"").subscribe({
          next:(grupo:GrupoModel)=>{
            this.grupo.set(grupo);
          },
          error:(error:any)=>{
            this.msg.mensaje.set({tipo:'error',titulo:'Obtención de los datos del grupo',detalle:`No se ha podido obtener el detalle del grupo, causa ${error}`});
            this.grupo.set(null);
          }
        });  
      });
    }

    OnCambiaGrupo(campo:string,evento:Event) {

    }

    OnCuandoSetGrupo(valor:GrupoModel|null) {
      this.usuariosSistema=[];
      this.usuariosGrupo=[];
      if(valor!=null) {
        this.admGrupSer.ListaUsuario(this.grupo()?.id??"").subscribe({
          next:(lst)=> {
            this.usuariosGrupo=lst;
            this.admUsrSer.Lista(0,0).subscribe({
              next:(lst2)=>{
                this.usuariosSistema=lst2.filter(x=>this.usuariosGrupo.filter(p=>p.id==x.id).length==0);
              },
              error:(err)=>{
                this.msg.mensaje.set({tipo:'error',titulo:'Obtencion de usuarios del sistema',detalle:`No se han podido obtener los usuarios del sistema, causa: ${err}`});    
              }
            });
          },
          error:(err)=>{
            this.msg.mensaje.set({tipo:'error',titulo:'Obtencion de usuarios del grupo',detalle:`No se han podido obtener los usuarios del grupo, causa: ${err}`});
          }
        })
      }
    }

}
