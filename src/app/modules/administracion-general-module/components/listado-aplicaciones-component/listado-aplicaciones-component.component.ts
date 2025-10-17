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
    AplicacionesFiltro:WritableSignal<AplicacionModel[]>=signal([]);

    OpcionesAplicaciones:MenuItem[]=[];

    filtro={
      PorId:"",
      PorCodigo:"",
      PorNombre:""
    };

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
        //routerLink:'/administracion/aplicaciones/nueva'
      });
    }

    GetListaAplicaciones() {
      this.admAplServ.Lista().subscribe({
        next:(lista)=>{
          this.Aplicaciones.set(lista);
          this.AplicacionesFiltro.set(lista);
        },
        error:(e)=>{
          this.Aplicaciones.set([]);
          this.AplicacionesFiltro.set([]);
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de aplicaciones',detalle:'No se ha podido obtener la lista de aplicaciones'})
        }
      });
    }

    ModalAltaAplicacion() {
      this.dlg.open(ModalAltaNuevaAplicacionComponent,{
        header:"Alta de aplicación/módulo",     
        modal:true,
        width:'100vm',
        contentStyle:{overflow:'auto'},
        appendTo:'body',
        closable:true
      }).onClose.subscribe((apli)=>{
        this.GetListaAplicaciones();
        if(apli!=null) {
          //Vamos a la ficha
        }
      });
    }

    FiltrarAplicaciones() {
       let data:AplicacionModel[];
       data=this.Aplicaciones();
       if(this.filtro.PorId) {
        data=data.filter(f=>(f.id??"").indexOf(this.filtro.PorId)>=0);        
       }
       if(this.filtro.PorCodigo) {
        data=data.filter(f=>(f.codigo??"").indexOf(this.filtro.PorCodigo)>=0);
       }
       if(this.filtro.PorNombre) {
        data=data.filter(f=>(f.nombre??"").indexOf(this.filtro.PorNombre)>=0)
       }
       this.AplicacionesFiltro.set(data);
    }
}
