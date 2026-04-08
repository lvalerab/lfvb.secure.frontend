import { Component } from '@angular/core';
import { TipoEntidadTerritorialModel } from '@app/data/interfaces/Callejero/TipoEntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-administracion-tipos-entidades-modal',
  standalone: false,
  templateUrl: './administracion-tipos-entidades-modal.component.html',
  styleUrl: './administracion-tipos-entidades-modal.component.less',
})
export class AdministracionTiposEntidadesModalComponent {

  tipos:TipoEntidadTerritorialModel[]=[];

  constructor(private clsSer:CallejeroService,
              private msg:ToastService
  )   {

  }

  ngOnInit() {
    this.getTipos();
  }

  getTipos() {
    this.clsSer.ListaTiposEntidadesTerritoriales().subscribe({
      next:(tipos)=>{
        tipos.push({
          id:null,
          codigo:"",
          nombre:""
        });
        this.tipos=tipos;
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Obtención de tipos de entidades",detalle:`No se ha podido obtener los tipos de entidades, causa: ${err.message}`});
      }
    });
  }

  cambiaPropiedadTipo(tipo:TipoEntidadTerritorialModel) {
    if(tipo.codigo?.trim()!="") {
      this.clsSer.AltaModificaTipoEntidadTerritorial(tipo).subscribe({
        next:(valor)=>{
          this.getTipos();
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:'Modficiacion del tipo de entidad territorial',detalle:`No se ha podido modificar la entidad, causa: ${error.message}`});
        }
      });
    }
  }
}
