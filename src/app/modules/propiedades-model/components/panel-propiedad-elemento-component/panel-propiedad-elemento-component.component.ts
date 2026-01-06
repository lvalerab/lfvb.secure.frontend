import { Component,Input,WritableSignal,signal,computed, effect, OnChanges, SimpleChanges, Output } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { PropiedadElementoModel } from '@app/data/interfaces/PropiedadElementoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { ValorEtiquetaModel } from '@app/data/interfaces/ValorEntiquetaModel';
import {GrupoValorEtiquetaModel} from '@data/interfaces/GrupoValorEtiquetaModel';
import { ValorPropiedadElementoModel } from '@app/data/interfaces/ValorPropiedadElementoModel';
import { ToastService } from '@app/shared/services/ToastService';
import { PropiedadesApiService } from '@data/services/api/PropiedadesApiService';
import { MenuItem } from 'primeng/api';
import { FileSelectEvent, FileUploadEvent } from 'primeng/fileupload';




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

    valoresFijos:GrupoValorEtiquetaModel[]=[];

    valorFijoSeleccionado:ValorEtiquetaModel|null=null;

    opciones:MenuItem[]=[];

    constructor(private propApi:PropiedadesApiService,
                private msg:ToastService
    ) {
      
    }

    ngOnInit() {
      this.ConfiguraOpcionesPropiedad();
    }

    ngOnChanges(changes: SimpleChanges): void {      
      if((changes["propiedad"]!=null && (changes["propiedad"].currentValue!==changes["propiedad"].previousValue))) {                
        this.GetValoresPropiedadElemento();
        this.ConfiguraOpcionesPropiedad();
        this.GetValoresPermitidos();
      }
      if((changes["elemento"]!=null && (changes["elemento"].currentValue!==changes["elemento"].previousValue))) {        
        this.GetValoresPropiedadElemento();
        this.ConfiguraOpcionesPropiedad();
        this.GetValoresPermitidos();
      }
    }

    GetValoresPermitidos() {
      if(this.propiedad?.tipoPropiedad?.listaValores) {
          this.propApi.ValoresPermitidos(this.propiedad?.codigo??"",this.elemento?this.elemento.id:null).subscribe({
            next:(valores)=>{
              this.valorFijoSeleccionado=null;
              this.valoresFijos=valores;
              this.valoresFijos.forEach(g=>{
                if(this.valorFijoSeleccionado==null) {
                  let aux=g.items.filter(i=>i.value==this.valor().texto)
                  this.valorFijoSeleccionado=aux.length>0?aux[0]:null;
                }
              });
              this.msg.mensaje.set({tipo:'info',titulo:'Valores permitidos',detalle:'Se han obtenido los valores permitidos'});
            },
            error:(err)=>{
              this.msg.mensaje.set({tipo:'error',titulo:'Valores permitodos',detalle:`No se ha podido obtener los valores permitidos para esta propiedad, causa ${err.message}`});
            }
          });
      } else {
        this.valoresFijos=[];
      }
    }

    CuandoSeleccionaValorFijo(evento:any) {
      debugger;
      this.valor().texto=this.valorFijoSeleccionado?.value??"";
    }

    ConfiguraOpcionesPropiedad() {
      this.opciones=[];
      this.opciones.push({
        label:'Guardar',
        icon:'pi pi-save',
        command:()=>this.GuardarPropiedadActual()
      })
    }

    GetValoresPropiedadElemento() {
      if(this.elemento!=null) {
        this.propApi.PropiedadesElemento(this.elemento?.id??"",this.propiedad?.codigo).subscribe({
          next:(propiedades)=>{
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
          error:(err)=>{
              this.msg.mensaje.set({tipo:'warm',titulo:'Obtencion de valores del elemento',detalle:'No se ha podido obtener los valores del elemento'});
            }
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

    CuandoCargaFicheroBase64(event:FileUploadEvent) {
      var f=event.files[0];
      var fr:FileReader=new FileReader();      
      fr.readAsDataURL(f);
      fr.onload=()=>{
        let enc=new TextDecoder("utf-8");
        let aux=this.valor(); 
        if(typeof(fr.result)!="string")  {
          let arr:ArrayBuffer=fr.result??new ArrayBuffer();      
          aux.texto=enc.decode(arr);
          this.valor.set(aux);   
        } else {
          aux.texto=fr.result;
          this.valor.set(aux);   
        }
      };     
    }

    CuandoSeleccionaFichero(event:FileSelectEvent) {
      var f=event.files[0];
      var fr:FileReader=new FileReader();      
      fr.readAsDataURL(f);
      fr.onload=()=>{
        let enc=new TextDecoder("utf-8");
        let aux=this.valor(); 
        if(typeof(fr.result)!="string")  {
          let arr:ArrayBuffer=fr.result??new ArrayBuffer();      
          aux.texto=enc.decode(arr);
          this.valor.set(aux);   
        } else {
          aux.texto=fr.result;
          this.valor.set(aux);   
        }
      };    
    }

    GuardarPropiedadActual() {      
      this.PropiedadElemento.idElemento=this.elemento?.id??"";
      this.PropiedadElemento.propiedad=this.propiedad;
      if(this.PropiedadElemento.idElemento!=null && this.PropiedadElemento.propiedad!=null && this.PropiedadElemento.propiedad.codigo!=null && this.PropiedadElemento.valores!=null && this.PropiedadElemento.valores.length>0) {
        this.propApi.GuardarPropiedadElemento(this.PropiedadElemento).subscribe({
          next:(p)=>{
            this.PropiedadElemento=p;
            this.msg.mensaje.set({tipo:'success',titulo:'Propiedad guardada con éxito',detalle:'Se ha guardado correctamente la propiedad'});
          },
          error:(err)=>{
            this.msg.mensaje.set({tipo:'error',titulo:'Guardar propiedad',detalle:`Ha ocurrido un error al guardar la propiedad, causa: ${err.message}`});
          }
        });
      }
    }
}
