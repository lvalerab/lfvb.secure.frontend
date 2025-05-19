import { Component,Input,WritableSignal,signal,computed, effect, OnChanges, SimpleChanges } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { PropiedadElementoModel } from '@app/data/interfaces/PropiedadElementoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { ValorPropiedadElementoModel } from '@app/data/interfaces/ValorPropiedadElementoModel';
import { PropiedadesApiService } from '@data/services/api/PropiedadesApiService';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-panel-propiedad-elemento-component',
  standalone: false,
  templateUrl: './panel-propiedad-elemento-component.component.html',
  styleUrl: './panel-propiedad-elemento-component.component.less'
})
export class PanelPropiedadElementoComponentComponent implements OnChanges {
    titulo:string="";

    @Input()
    elemento:ElementoModel|null=null;

    @Input()
    propiedad:PropiedadModel|null=null;


    @Input()
    VerDatosElemento:boolean=true;

    @Input()
    VerDatosPropiedad:boolean=true;

    valor:WritableSignal<ValorPropiedadElementoModel>=signal({id:null,idPropiedadElemento:null,bool:false,texto:"",fecha:null,fechaMaxima:null,numero:null,numeroMaximo:null});

    PropiedadElemento:PropiedadElementoModel={id:null,idElemento:null,propiedad:null,valores:[],fechaValor:new Date(),activo:true};
    Historico:PropiedadElementoModel[]|undefined=undefined;
    fechas:Date[]=[];

    constructor(private propApi:PropiedadesApiService) {
      
    }

    ngOnInit() {
      
    }

    ngOnChanges(changes: SimpleChanges): void {
      debugger;
      if((changes["propiedad"]!=null && (changes["propiedad"].previousValue!=null && changes["propiedad"].currentValue!==changes["propiedad"].previousValue)) 
        ||(changes["elemento"]!=null && (changes["elemento"].previousValue!=null && changes["elemento"].currentValue!==changes["elemento"].previousValue))) {
        this.GetValoresPropiedadElemento();
      }
    }

    GetValoresPropiedadElemento() {
      this.propApi.PropiedadesElemento(this.elemento?.id??"",this.propiedad?.codigo).subscribe(propiedades=>{
        if(propiedades!=null && propiedades.length>=1) {          
          if(this.propiedad?.tipoPropiedad?.historico) {
            this.PropiedadElemento=propiedades.filter(x=>x.activo==true)[0];
            this.Historico=propiedades;            
          } else {
            this.PropiedadElemento=propiedades[0];
            this.Historico==null;
          }
        } else {
          this.PropiedadElemento={
            id:null,
            idElemento:this.elemento?.id??"",
            propiedad:this.propiedad,
            fechaValor:new Date(),
            activo:true,
            valores:[]
          };
          this.PropiedadElemento.valores?.push({id:null,idPropiedadElemento:null,bool:false,texto:"",fecha:null,fechaMaxima:null,numero:null,numeroMaximo:null});
        }
        //Solo vamos a modificar una propiedad a la vez
        this.valor.set(this.PropiedadElemento.valores!=null?this.PropiedadElemento.valores[0]:{id:null,idPropiedadElemento:null,bool:false,texto:"",fecha:null,fechaMaxima:null,numero:null,numeroMaximo:null});
      },
      error=>{

      });
    }

}
