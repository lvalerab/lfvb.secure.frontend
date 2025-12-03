import { Component,Output,WritableSignal,signal, EventEmitter } from '@angular/core';
import { PasoModel } from '@app/data/interfaces/Pasos/PasoModel';
import { InterseccionModel } from '@app/data/interfaces/Pasos/InterseccionModel';
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

  wsPasos:WritableSignal<PasoModel[]|null>=signal(null);


  @Input({required:true})
  get pasos():PasoModel[]|null {
    return this.wsPasos();
  }

  ///Cuando hace click en la cabecera de un paso
  @Output()
  onCuandoHaceClickPaso=new EventEmitter<PasoModel>();

  //Cuando hace click en una interseccion
  @Output()
  onCuandoHaceClickInterseccion=new EventEmitter<InterseccionModel>();


  set pasos(newValue:PasoModel[]|null) {
    this.wsPasos.set(newValue);
  }

  

  columnas:any=[{id:"",texto:""}];
  filas:any=[{id:"",texto:"",relacion:""}]

  obsPasos:Observable<PasoModel[]|null>=toObservable(this.wsPasos);

  constructor() {
    
  }

  ngOnInit() {   
    this.obsPasos.subscribe({
      next:(valores)=>this.RellenarTabla(valores??[])
    }); 
    this.RellenarTabla(this.wsPasos()??[]);
  }

  RellenarTabla(valores:PasoModel[]) {        
    this.columnas=[{id:"",texto:``,obj:null}];
      this.filas=[];
      if(valores) {
        valores.forEach(p => {
          this.columnas.push({id:p.id,texto:p.nombre, obj:p});
          this.filas.push({id:p.id,texto:p.nombre,obj:p,relacion:[]});
        });
        this.filas.forEach((f:any) => {            
        this.columnas.forEach((c:any) => {          
            if(c.id!="") {
              let valor={pasoInicial:c.obj,pasoFinal:f.obj, relacionado:false};
              valor.relacionado=c.obj.pasosSiguientes.indexOf(f.id)>=0?true:false;
              f.relacion.push(valor);          
            } 
          });
        });
      }
  }

  onPulsaCabecera(obj:PasoModel) {
    debugger;
    this.onCuandoHaceClickPaso.emit(obj);
  }

  onPulsaInterseccion(ini:PasoModel,fin:PasoModel,relacionado:boolean) {
    debugger;
    let p:InterseccionModel={
      inicial:ini,
      final:fin,
      relacionado:relacionado
    };
    this.onCuandoHaceClickInterseccion.emit(p);
  }
}
