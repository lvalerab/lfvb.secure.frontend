import { Component, WritableSignal, signal } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ToastService } from '@app/shared/services/ToastService';
import { AdministracionAplicacionesService } from '@data/services/api/AdministracionAplicacionesService';

@Component({
  selector: 'app-listado-aplicaciones-component',
  standalone: false,
  templateUrl: './listado-aplicaciones-component.component.html',
  styleUrl: './listado-aplicaciones-component.component.less'
})
export class ListadoAplicacionesComponentComponent {

    Aplicaciones:WritableSignal<AplicacionModel[]>=signal([]);

    constructor(private admAplServ:AdministracionAplicacionesService,
                private msg:ToastService
    ) {

    }

    ngOnInit() {
      this.GetListaAplicaciones();
      
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

}
