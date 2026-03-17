import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TipoEntidadTerritorialModel } from '@app/data/interfaces/Callejero/TipoEntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { TooltipModule } from 'primeng/tooltip';

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
  multiple:boolean=false;

  @Input()
  seleccion:TipoEntidadTerritorialModel|null=null;

  @Input()
  seleccionMultiple:TipoEntidadTerritorialModel[]=[];

  @Output()
  onSeleccion:EventEmitter<TipoEntidadTerritorialModel|null>=new EventEmitter();

  @Output()
  onSeleccionMultiple:EventEmitter<TipoEntidadTerritorialModel[]>=new EventEmitter();

  tipos:TipoEntidadTerritorialModel[]=[];

  constructor(private clSev:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {

  }


  OnCuandoCambiaModelo(tipo:TipoEntidadTerritorialModel) {
    this.seleccion=tipo;
    this.onSeleccion.emit(tipo);
  }

  OnCuandoCambiaModeloMultiple(tipos:TipoEntidadTerritorialModel[]) {
    this.seleccionMultiple=tipos;
    this.onSeleccionMultiple.emit(tipos);
  }

}
