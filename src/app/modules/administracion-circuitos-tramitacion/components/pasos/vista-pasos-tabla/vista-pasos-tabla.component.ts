import { Component,WritableSignal,signal } from '@angular/core';
import { PasoModel } from '@app/data/interfaces/Pasos/PasoModel';
import { Input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vista-pasos-tabla',
  standalone: false,
  templateUrl: './vista-pasos-tabla.component.html',
  styleUrl: './vista-pasos-tabla.component.less',
})
export class VistaPasosTablaComponent {

  @Input({required:true})
  pasos:WritableSignal<PasoModel[]|null>=signal([]);

  

  columnas:any=[{id:"",texto:""}];
  filas:any=[{id:"",texto:"",relacion:""}]

  obsPasos:Observable<PasoModel[]|null>=toObservable(this.pasos);

  constructor() {
    
  }

  ngOnInit() {   
    this.obsPasos.subscribe({
      next:(valores)=>this.RellenarTabla(valores??[])
    }); 
    this.RellenarTabla(this.pasos()??[]);
  }

  RellenarTabla(valores:PasoModel[]) {    
    this.columnas=[{id:"",texto:"",obj:null}];
      this.filas=[{id:"",texto:"",obj:null, relacion:[]}];
      if(valores) {
        valores.forEach(p => {
          this.columnas.push({id:p.id,texto:p.nombre, obj:p});
          this.filas.push({id:p.id,texto:p.nombre,obj:p,relacion:[]});
        });
        this.filas.forEach((f:any) => {            
        this.columnas.forEach((c:any) => {          
            if(c.id!="")
              f.relacion.push(c.obj.pasosSiguientes.contains(f.id)?{idPaso:c.id,idPasoRelacionado:f.id}:{});          
          });
        });
      }
  }

}
