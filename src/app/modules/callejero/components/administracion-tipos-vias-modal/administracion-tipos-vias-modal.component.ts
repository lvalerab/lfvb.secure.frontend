import { Component } from '@angular/core';
import { TipoViaModel } from '@app/data/interfaces/Callejero/TipoViaModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-administracion-tipos-vias-modal',
  standalone: false,
  templateUrl: './administracion-tipos-vias-modal.component.html',
  styleUrl: './administracion-tipos-vias-modal.component.less',
})
export class AdministracionTiposViasModalComponent {

    tipos:TipoViaModel[]=[];

    constructor(private clsSer:CallejeroService,
                private msg:ToastService
    ) {

    }

    ngOnInit() {
      this.getTiposVias();
    }

    getTiposVias() {
      this.clsSer.ListaTiposVias().subscribe({
        next:(tipos)=>{
          tipos.push({
            codigo:"",
            nombre:""
          });
          this.tipos=tipos;
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Obtención de tipos de vias",detalle:`No se ha podido obtener los tipos de vias, causa: ${err.message}`});
        }
      })
    }


    cambiaPropiedadTipo(tipo:TipoViaModel) {
      if(tipo.codigo?.trim()!="") {
        this.clsSer.AltaModificacionTipoVia(tipo).subscribe({
          next:(via)=>{
            this.getTiposVias();
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:'Modificar tipo via',detalle:`No se ha podido modificar el tipo de via, causa ${error.message}`});
          }
        })
      }
    }
}
