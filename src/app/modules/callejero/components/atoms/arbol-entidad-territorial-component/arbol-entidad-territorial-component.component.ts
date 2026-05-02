import { Component, model, Input } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { constantes } from 'src/const/constantes';

@Component({
  selector: 'app-arbol-entidad-territorial-component',
  standalone: false,
  templateUrl: './arbol-entidad-territorial-component.component.html',
  styleUrl: './arbol-entidad-territorial-component.component.less',
})
export class ArbolEntidadTerritorialComponentComponent {

  entidad=model<EntidadTerritorialModel|null|undefined>(null);

  @Input()
  id:string|null|undefined=null;

  @Input()
  ObtenerArbol:boolean=false;

  constructor(private clServ:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    if(this.ObtenerArbol) {
      this.clServ.GetArbolEntidad((this.entidad()?.id??this.id)??constantes.guid.zero).subscribe({
        next:(value)=>{
          this.entidad.set(value);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Obtención del arbol de entidades",detalle:`No se ha podido obtener el arbol de entidades, causa: ${error.message}`});
        }
      });
    }
  }
  
}
