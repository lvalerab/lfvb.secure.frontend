import { Component, WritableSignal, signal } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ToastService } from '@app/shared/services/ToastService';
import { AdministracionAplicacionesService } from '@data/services/api/AdministracionAplicacionesService';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalAltaNuevaAplicacionComponent } from '../modal-alta-nueva-aplicacion/modal-alta-nueva-aplicacion.component';

@Component({
  selector: 'app-listado-aplicaciones-component',
  standalone: false,
  templateUrl: './listado-aplicaciones-component.component.html',
  styleUrl: './listado-aplicaciones-component.component.less',
  providers:[DialogService]
})
export class ListadoAplicacionesComponentComponent {

    Aplicaciones:WritableSignal<AplicacionModel[]>=signal([]);

    OpcionesAplicaciones:MenuItem[]=[];

    constructor(private admAplServ:AdministracionAplicacionesService,
                private msg:ToastService,
                private dlg:DialogService
    ) {

    }

    ngOnInit() {
      this.GetListaAplicaciones();
      this.ConfigurarOpcionesAplicaciones();
    }

    ConfigurarOpcionesAplicaciones() {
      this.OpcionesAplicaciones=[];
      this.OpcionesAplicaciones.push({
        label:'Nueva aplicacion',
        icon:'pi pi-plus',
        command:(evento)=>this.ModalAltaAplicacion()
      });
    }

    GetListaAplicaciones() {
      this.admAplServ.Lista().subscribe({
        next:(lista)=>{
          this.Aplicaciones.set(lista);
        },
        error:(e)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de aplicaciones',detalle:'No se ha podido obtener la lista de aplicaciones'})
        }
      });
    }

    ModalAltaAplicacion() {
      this.dlg.open(ModalAltaNuevaAplicacionComponent,{
        header:"Alta de aplicación/módulo",     
        modal:true,
        width:'50vm',
        contentStyle:{overflow:'auto'},
        appendTo:'body',
        closable:true
      });
    }
}
