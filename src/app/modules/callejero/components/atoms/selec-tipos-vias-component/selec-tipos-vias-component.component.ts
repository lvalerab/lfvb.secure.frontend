import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TipoViaModel } from '@app/data/interfaces/Callejero/TipoViaModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-selec-tipos-vias-component',
  standalone: false,
  templateUrl: './selec-tipos-vias-component.component.html',
  styleUrl: './selec-tipos-vias-component.component.less',
})
export class SelecTiposViasComponentComponent {
  
  tipos:TipoViaModel[]=[];

  @Input()
  multiple:boolean=false;

  @Input()
  seleccionado:TipoViaModel|null=null;

  @Input()
  seleccionados:TipoViaModel[]|null=null;

  @Output()
  onSeleccion:EventEmitter<TipoViaModel|null>=new EventEmitter();

  @Output()
  onSeleccionMultiple:EventEmitter<TipoViaModel[]|null>=new EventEmitter();

  constructor(private clServ:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {

  }

  GetListaTiposVias() {
    this.clServ.ListaTiposVias().subscribe({
      next:(vs)=>{
        this.tipos=vs;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Tipos de vias',detalle:`No se han podido obtener los tipos de vias, causa: ${error.message}`});
      }
    });
  }

  onCuandoCambiaModelo(tipo:TipoViaModel) {
    this.seleccionado=tipo;
    this.onSeleccion.emit(tipo);
  }

  onCuandoCambioModeloMultiple(tipos:TipoViaModel[]) {
    this.seleccionados=tipos;
    this.onSeleccionMultiple.emit(tipos);
  }
}
