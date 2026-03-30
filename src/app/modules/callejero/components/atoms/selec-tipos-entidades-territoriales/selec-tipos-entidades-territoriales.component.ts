import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { TipoEntidadTerritorialModel } from '@app/data/interfaces/Callejero/TipoEntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';


@Component({
  selector: 'app-selec-tipos-entidades-territoriales',
  standalone: false,
  templateUrl: './selec-tipos-entidades-territoriales.component.html',
  styleUrl: './selec-tipos-entidades-territoriales.component.less',
})
export class SelecTiposEntidadesTerritorialesComponent {

  @Input()
  id:string|null=null;

  @Input()
  placeholder:string="Seleccione el tipo de entidad";

  @Input()
  multiple:boolean=false;

  seleccion=model<TipoEntidadTerritorialModel|null>(null);

  seleccionMultiple=model<TipoEntidadTerritorialModel[]|null>([]);

  tipos:TipoEntidadTerritorialModel[]=[];

  constructor(private clSev:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.getTiposEntidades();
  }

  getTiposEntidades() {
    this.clSev.ListaTiposEntidadesTerritoriales().subscribe({
      next:(t)=>{
        this.tipos=t;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Lista de tipos de entidades",detalle:`No se ha podido obtener los tipos de entidades ${error.message}`});
      }
    });
  }


  OnCuandoCambiaModelo(tipo:TipoEntidadTerritorialModel) {
    this.seleccion.set(tipo);    
  }

  OnCuandoCambiaModeloMultiple(tipos:TipoEntidadTerritorialModel[]) {
    this.seleccionMultiple.set(tipos);    
  }

}
