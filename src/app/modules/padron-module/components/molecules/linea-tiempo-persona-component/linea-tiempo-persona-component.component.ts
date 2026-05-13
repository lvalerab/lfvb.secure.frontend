import { Component, model, Input, effect } from '@angular/core';
import { EntradaLineaTemporalPersonaModel } from '@app/data/interfaces/Censo/EntradaLineaTemporalPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { line } from 'd3';
import { constantes } from 'src/const/constantes';

@Component({
  selector: 'app-linea-tiempo-persona-component',
  standalone: false,
  templateUrl: './linea-tiempo-persona-component.component.html',
  styleUrl: './linea-tiempo-persona-component.component.less',
})
export class LineaTiempoPersonaComponentComponent {

    
    id=model<string|undefined|null>(null);

    @Input()
    horizontal:boolean=false;

    @Input()
    alto:string="300px";

    @Input()
    ancho:string="100%";


    linea:EntradaLineaTemporalPersonaModel[]=[];


    constructor(private csServ:CensoService,
                private msg:ToastService
    ) {
      effect(()=>{
        this.ObtenLineaTemporal();
      });
    }

    ngOnInit() {
      this.ObtenLineaTemporal();
    }

    ObtenLineaTemporal() {
      if(this.id()) {
        this.csServ.GetLineaTemporal(this.id()??constantes.guid.zero).subscribe({
          next:(values)=>{
            this.linea=values;
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Espacio temporal de la persona",detalle:`No se ha podido obtener los eventos importantes de la persona, causa: ${error.message}`});
          }
        });
      } else {
        this.linea=[];
      }
    }
}
