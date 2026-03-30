import { Component, Input, Output, EventEmitter, model } from '@angular/core';
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

  
  seleccionado=model<TipoViaModel|null>(null);

  @Input()
  placeholder:string="Seleccione el tipo de via";

  
  seleccionados=model<TipoViaModel[]|null>(null);

  
  constructor(private clServ:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.GetListaTiposVias();
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
    this.seleccionado.set(tipo);    
  }

  onCuandoCambioModeloMultiple(tipos:TipoViaModel[]) {
    this.seleccionados.set(tipos);    
  }
}
