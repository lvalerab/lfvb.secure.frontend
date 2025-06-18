import { Component, OnDestroy } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { ToastService } from '@app/shared/services/ToastService';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-alta-nuevo-grupo-permisos',
  standalone: false,
  templateUrl: './modal-alta-nuevo-grupo-permisos.component.html',
  styleUrl: './modal-alta-nuevo-grupo-permisos.component.less',
  
})
export class ModalAltaNuevoGrupoPermisosComponent implements OnDestroy {
    grupo:GrupoModel={id:"",aplicacion:{id:"",codigo:"",nombre:"",elementos:[],grupos:[]},nombre:"",usuarioId:null};
    aplicaciones:AplicacionModel[]=[];
    usuarios:UsuarioModel[]=[];
    usuariosGrupo:UsuarioModel[]=[];

    constructor(private ref:DynamicDialogRef,
                private msg:ToastService,
                private admAplSer:AdministracionAplicacionesService,
                private admUsrSer:AdministracionUsuariosService
    ) {

    }

    ngOnInit() {
      this.GetListaAplicaciones();
      this.GetUsuarios();
    }

    ngOnDestroy(): void {
      if(this.ref) {
        this.ref.destroy();
      }
    }

    GetListaAplicaciones() {
      this.admAplSer.Lista().subscribe({
        next:(lst)=>{
          this.aplicaciones=lst;
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Listado de aplicaciones',detalle:`No se ha podido obtener el listado de las aplicaciones, causa: ${err}`});
        }
      })
    }

    GetUsuarios() {
      this.admUsrSer.Lista(0,0).subscribe({
        next:(lst)=>{
          debugger;
          this.usuarios=lst;
          this.usuariosGrupo=[];
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Listado de usuarios del sistema',detalle:`No se ha podido obtener el listado de usuarios del sistema, causa: ${err}`});
        }
      })
    }
}
