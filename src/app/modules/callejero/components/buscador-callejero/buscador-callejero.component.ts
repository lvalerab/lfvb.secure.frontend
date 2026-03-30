import { Component,Input, Output,EventEmitter,WritableSignal,signal, OnDestroy } from '@angular/core';
import { CallejeroModel } from '@app/data/interfaces/Callejero/CallejeroModel';
import { FiltroBusquedaCallejeroModel } from '@app/data/interfaces/Callejero/FiltroBusquedaCallejeroModel';
import { TipoViaModel } from '@app/data/interfaces/Callejero/TipoViaModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-buscador-callejero',
  standalone: false,
  templateUrl: './buscador-callejero.component.html',
  styleUrl: './buscador-callejero.component.less',
  providers:[DialogService]
})
export class BuscadorCallejeroComponent implements OnDestroy {
  @Input()
  filtro:FiltroBusquedaCallejeroModel={
    tiposVia:null,
    nombre:null,
    entidadesTerritoriales:[],
    callesSuperiores:[],
    callesInferiores:[]
  }


  resultado:CallejeroModel[]=[];

  BuscadorHerramientasItem:MenuItem[]=[];

  constructor(private clSev:CallejeroService,
              private msg:ToastService,
              private dlgRef:DynamicDialogRef
  ) {

  }

  ngOnInit() {
    this.ConfigurarBarraHerramientas();
  }

  ConfigurarBarraHerramientas() {
    let aux:MenuItem[]=[];
    aux.push({
      icon:'pi pi-search',
      label:'Buscar',
      command:()=>this.buscar()
    });
    this.BuscadorHerramientasItem=aux;
  }

  buscar() {
    this.clSev.BuscarVias(this.filtro).subscribe({
      next:(vias)=>{
        this.resultado=vias;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Buscar vias",detalle:`No es posible hacer la consulta, causa: ${error.message}`});
      }
    });
  }

  onSeleccionVia(tv:TipoViaModel[]|null) {
    this.filtro.tiposVia=tv;
  }

  Seleccion(via:CallejeroModel) {
    if(this.dlgRef) {
      this.dlgRef.close(via);
    }
  }

  ngOnDestroy() {
    if(this.dlgRef) {
      this.dlgRef.destroy();
    }
  }
}
