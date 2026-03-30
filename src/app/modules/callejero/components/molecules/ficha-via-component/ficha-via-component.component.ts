import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { TipoViaModel } from '@app/data/interfaces/Callejero/TipoViaModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { CallejeroModel } from '@data/interfaces/Callejero/CallejeroModel';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ficha-via-component',
  standalone: false,
  templateUrl: './ficha-via-component.component.html',
  styleUrl: './ficha-via-component.component.less',
})
export class FichaViaComponentComponent {

  
  via=model<CallejeroModel>({
    id:null,
    tipoVia:null,
    nombre:null,
    callesInferiores:[],
    calleSuperior:null,
    entidadTerritorial:null
  });

  @Input()
  mostrarAlertaSinVia:boolean=false;

  @Output()
  cuandoCambiaVia:EventEmitter<CallejeroModel|null|undefined>=new EventEmitter();

  BarraHerramientasItems:MenuItem[]=[];

  constructor(private clsServ:CallejeroService,
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
      icon:"pi pi-save",
      command:()=>this.GuardarVia()
    });
    this.BarraHerramientasItems=aux;
  }

  onCuandoCambiaEntidadTerritorial(et:EntidadTerritorialModel|null) {
    var aux=this.via();
    if(aux)
      aux.entidadTerritorial=et;
    this.via.set(aux);
    this.cuandoCambiaVia.emit(this.via());
  }

  onCuandoCambiaTipoVia(tv:TipoViaModel|null) {
    var aux=this.via();
    if(aux)
      aux.tipoVia=tv;
    this.via.set(aux);
    this.cuandoCambiaVia.emit(this.via());
  }

  onCuandoCambiaNombre(nm:string|null) {
    this.cuandoCambiaVia.emit(this.via());
  }

  GuardarVia() {
    var aux=this.via();
    if(aux) {
      if(aux?.id==null) {
        this.clsServ.AltaVia(aux).subscribe({
          next:(via)=>{
            this.via.set(via);
            this.msg.mensaje.set({tipo:"info",titulo:"Guardar via",detalle:`Se ha guardado correctamente la via`});
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar via",detalle:`No se ha podido guardar la via, causa: ${error.message}`});
          }
        });
      } else {
        this.clsServ.ModificaVia(aux).subscribe({
          next:(via)=>{
            this.via.set(via);
            this.msg.mensaje.set({tipo:"info",titulo:"Guardar via",detalle:`Se ha guardado correctamente la via`});
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar via",detalle:`No se ha podido guardar la via, causa: ${error.message}`});
          }
        });
      }
    }
  }
}
