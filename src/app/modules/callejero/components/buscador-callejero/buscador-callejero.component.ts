import { Component,Input, Output,EventEmitter,WritableSignal,signal } from '@angular/core';
import { CallejeroModel } from '@app/data/interfaces/Callejero/CallejeroModel';
import { FiltroBusquedaCallejeroModel } from '@app/data/interfaces/Callejero/FiltroBusquedaCallejeroModel';
import { TipoViaModel } from '@app/data/interfaces/Callejero/TipoViaModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-buscador-callejero',
  standalone: false,
  templateUrl: './buscador-callejero.component.html',
  styleUrl: './buscador-callejero.component.less',
})
export class BuscadorCallejeroComponent {
  @Input()
  filtro:FiltroBusquedaCallejeroModel={
    tiposVia:null,
    nombre:null,
    entidadesTerritoriales:[],
    callesSuperiores:[],
    callesInferiores:[]
  }


  resultado:WritableSignal<CallejeroModel[]>=signal([]);

  constructor(private clSev:CallejeroService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {

  }

  buscar() {
    this.clSev.BuscarVias(this.filtro).subscribe({
      next:(vias)=>{
        this.resultado.set(vias);
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Buscar vias",detalle:`No es posible hacer la consulta, causa: ${error.message}`});
      }
    });
  }

  onSeleccionVia(tv:TipoViaModel[]|null) {
    this.filtro.tiposVia=tv;
  }
}
