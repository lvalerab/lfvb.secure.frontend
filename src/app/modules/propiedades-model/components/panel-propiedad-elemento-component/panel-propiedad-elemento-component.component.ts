import { Component,Input } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { PropiedadElementoModel } from '@app/data/interfaces/PropiedadElementoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { ValorPropiedadElementoModel } from '@app/data/interfaces/ValorPropiedadElementoModel';
import { PropiedadesApiService } from '@data/services/api/PropiedadesApiService';

@Component({
  selector: 'app-panel-propiedad-elemento-component',
  standalone: false,
  templateUrl: './panel-propiedad-elemento-component.component.html',
  styleUrl: './panel-propiedad-elemento-component.component.less'
})
export class PanelPropiedadElementoComponentComponent {
    titulo:string="";

    @Input()
    elemento:ElementoModel|null=null;

    @Input()
    propiedad:PropiedadModel|null=null;

    @Input()
    VerDatosElemento:boolean=true;

    @Input()
    VerDatosPropiedad:boolean=true;

    valor:ValorPropiedadElementoModel|null=null;

    PropiedadesElemento:PropiedadElementoModel[]=[];

    constructor(private propApi:PropiedadesApiService) {

    }

    ngOnInit() {

    }

    GetValoresPropiedadElemento() {
      this.propApi.PropiedadesElemento(this.elemento?.id??"",this.propiedad?.codigo).subscribe(propiedades=>{
        this.PropiedadesElemento=propiedades;
        if(this.PropiedadesElemento.length<=0 || this.propiedad?.tipoPropiedad?.historico || this.propiedad?.tipoPropiedad?.multiple) {
          this.valor={
            id:null,
            idPropiedadElemento:null,
            bool:false,
            fecha:null,
            fechaMaxima:null,
            numero:null,
            numeroMaximo:null,
            texto:""
          };
        } else {
          if(this.PropiedadesElemento!=null) {    
            var aux=this.PropiedadesElemento[0];
            var aux2=aux.valores??[];        
            this.valor=aux2[0];
          }
        }
      },
      error=>{

      });
    }

}
