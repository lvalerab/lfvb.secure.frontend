import { Component } from '@angular/core';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { AdministracionGruposPermisosService } from '@app/data/services/api/AdministracionGruposPermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {ModalAltaNuevoGrupoPermisosComponent} from '../modal-alta-nuevo-grupo-permisos/modal-alta-nuevo-grupo-permisos.component';

@Component({
  selector: 'app-listado-grupos-permisos',
  standalone: false,
  templateUrl: './listado-grupos-permisos.component.html',
  styleUrl: './listado-grupos-permisos.component.less',
  providers:[DialogService]
})
export class ListadoGruposPermisosComponent {

    grupos:GrupoModel[]=[];
    filtradoGrupos:GrupoModel[]=[];

    OpcionesGrupos:MenuItem[]=[];

    constructor(private admGrup:AdministracionGruposPermisosService,
                private msg:ToastService,
                private dlg:DialogService
    ) {

    }

    ngOnInit() {
      this.getGrupos();
      this.ConfiguraOpcionesGrupos();
    }

    ConfiguraOpcionesGrupos() {
      this.OpcionesGrupos=[];
      this.OpcionesGrupos.push({
        label:'Nuevo grupo',
        icon:'pi pi-plus',
        command:(event)=>this.ModalNuevoGrupo()
      });
    }

    getGrupos() {
      this.admGrup.Lista().subscribe({
        next:(lista:GrupoModel[])=>{
          this.grupos=lista;
          this.filtraGrupos();
        },
        error:(error:any)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Obtener listado de grupos',detalle:`No se ha podido obtener el listado de grupos, causa: ${error}`});
        }
      });
    }

    filtraGrupos() {
      this.filtradoGrupos=this.grupos;
    }

    ModalNuevoGrupo() {
      this.dlg.open(ModalAltaNuevoGrupoPermisosComponent,{
        header:"Alta de grupo de permisos",     
        modal:true,
        width:'50vm',
        contentStyle:{overflow:'auto'},
        appendTo:'body',
        closable:true
      });
    }
}
