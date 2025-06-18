import { Component,Input,WritableSignal,signal,computed, effect, OnChanges, SimpleChanges, Output } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { PropiedadElementoModel } from '@app/data/interfaces/PropiedadElementoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { ValorPropiedadElementoModel } from '@app/data/interfaces/ValorPropiedadElementoModel';
import { ToastService } from '@app/shared/services/ToastService';
import { PropiedadesApiService } from '@data/services/api/PropiedadesApiService';




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
    
    @Input()
    PropiedadElemento:PropiedadElementoModel={id:null,idElemento:null,propiedad:null,valores:[],fechaValor:new Date(),activo:true};
   

    Historico:PropiedadElementoModel[]|undefined=undefined;
    fechas:Date[]=[];

    constructor(private propApi:PropiedadesApiService,
                private msg:ToastService
    ) {
      
    }

    ngOnInit() {
      
    }

    ngOnChanges(changes: SimpleChanges): void {
      if((changes["propiedad"]!=null && (changes["propiedad"].previousValue!=null && changes["propiedad"].currentValue!==changes["propiedad"].previousValue)) 
        ||(changes["elemento"]!=null && (changes["elemento"].previousValue!=null && changes["elemento"].currentValue!==changes["elemento"].previousValue))) {
        this.GetValoresPropiedadElemento();
      }
    }

    GetValoresPropiedadElemento() {
      debugger;
      if(this.elemento!=null) {
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
          if(this.PropiedadElemento.valores==null || this.PropiedadElemento.valores.length==0) {
            this.PropiedadElemento.valores=[];
            this.PropiedadElemento.valores.push({id:null,idPropiedadElemento:null,bool:false,texto:"",fecha:null,fechaMaxima:null,numero:null,numeroMaximo:null});
          }
          //Solo vamos a modificar una propiedad a la vez
          this.valor.set(this.PropiedadElemento.valores[0]);
        },
        error=>{
          this.msg.mensaje.set({tipo:'warm',titulo:'Obtencion de valores del elemento',detalle:'No se ha podido obtener los valores del elemento'});
        });
      } else {
        //Es una configuraciond e propiead sin elemento
        if(this.PropiedadElemento.valores==null || this.PropiedadElemento.valores.length==0) {
          this.PropiedadElemento.valores=[];
          this.PropiedadElemento.valores.push({id:null,idPropiedadElemento:null,bool:false,texto:"",fecha:null,fechaMaxima:null,numero:null,numeroMaximo:null});
        }
        this.valor.set(this.PropiedadElemento.valores[0]);
      }
    }

    CuandoCargaFicheroBase64(event:any) {

    }
}
