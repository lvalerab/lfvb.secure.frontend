import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { error } from 'console';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ficha-entidad-territorial-component',
  standalone: false,
  templateUrl: './ficha-entidad-territorial-component.component.html',
  styleUrl: './ficha-entidad-territorial-component.component.less',
})
export class FichaEntidadTerritorialComponentComponent {

  
  entidad=model<EntidadTerritorialModel>({
    id:null,
    nombre:null,
    padre:null,
    tipo:null
  });

  @Input()
  mostrarMensajeSinValor:boolean=false;

  @Output()
  cuandoCambiaEntidad:EventEmitter<EntidadTerritorialModel|null|undefined>=new EventEmitter();


  BarraHerramientasItems:MenuItem[]=[];

  constructor(private clSev:CallejeroService,
              private msg:ToastService
  ) {

  }


  ngOnInit() {
    this.ConfiguraBarraHerramientas();
  }

  ConfiguraBarraHerramientas() {
    let aux:MenuItem[]=[];
    aux.push({
      label:"Guardar",
      icon:'pi pi-save',
      command:()=>this.Guardar()
    });
    aux.push({
      label:"Eliminar",
      icon:"pi pi-trash",
      command:()=>this.Eliminar()
    })
    this.BarraHerramientasItems=aux;
  }


  Guardar() {
    var aux=this.entidad();
    if(aux) {
      if(aux?.id==null) {
        this.clSev.AltaEntidad(aux).subscribe({
          next:(entidad)=>{
            this.entidad.set(entidad);
            this.msg.mensaje.set({tipo:"info",titulo:"Guardar entidad",detalle:`Se ha guardado correctamente la entidad`});
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar entidad",detalle:`No se ha podido guardar la entidad, causa: ${error.message}`})
          }
        });
      } else {
        this.clSev.ModificaEntidad(aux).subscribe({
          next:(entidad)=>{
            this.entidad.set(entidad);
            this.msg.mensaje.set({tipo:"info",titulo:"Guardar entidad",detalle:`Se ha guardado correctamente la entidad`});
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar entidad",detalle:`No se ha podido guardar la entidad, causa: ${error.message}`})
          }
        });
      }
    }
  }

  Eliminar() {
    if(this.entidad()) {
      this.clSev.EliminaEntidad(this.entidad().id??"").subscribe({
        next:(borrado)=>{
          if(borrado)
            this.entidad.set({
              id:null,
              nombre:null,
              padre:null,
              tipo:null
            });
            this.msg.mensaje.set({tipo:"info",titulo:"Eliminar entidad",detalle:`Se ha eliminado con éxito`});
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Eliminar entidad",detalle:`No se puede eliminar la entidad, causa: ${err.message}`});
        }
      });
    }
  }
}
