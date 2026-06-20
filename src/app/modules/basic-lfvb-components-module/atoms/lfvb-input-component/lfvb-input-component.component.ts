import { Component, model, Input, Output, WritableSignal,signal, EventEmitter } from '@angular/core';
import { PermisosService } from '@app/shared/services/PermisosService';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { constantes } from 'src/const/constantes';
import { environment } from '@environments/environment';


@Component({
  selector: 'lfvb-input-component',
  standalone: false,
  templateUrl: './lfvb-input-component.component.html',
  styleUrl: './lfvb-input-component.component.less',
})
export class LfvbInputComponentComponent {

  /////////////////////////////////////
  //Propiedades diseño
  /////////////////////////////////////

  ///
  //Indicamos el tipo
  ///
  @Input()
  Tipo:string|null="text";

  @Input()
  ValorVisibleModelo:string="";

  @Input()
  Editable:boolean=false;

  @Input()
  Permisos:string="";


  /////////////////////////////////////
  //Propiedades de valores
  /////////////////////////////////////

  ///
  //Indicamos el model
  ///
  modelo=model<any>(null);

  @Input()
  Opciones:any[]=[];

  @Input()
  OpcionLabel:string="";

  @Input()
  Label:string="";

  @Input()
  Tamanyo:"small"|"large"="small";

  @Input()
  CadenaFormato:string="";

  @Input()
  I18NTraducir:boolean=false;

  @Input()
  ClaveI18N:string="";

  @Output()
  onCuandoCambiaValorMostrado:EventEmitter<any>=new EventEmitter();

  ////////////////////////////////
  //Propiedades de estado
  ////////////////////////////////
  
  cuandoCambiaModelo:Observable<any>;
  ModoEditable:WritableSignal<boolean>=signal(false);
  valorVisible:any;

  constructor(private permSrv:PermisosService) {
    this.cuandoCambiaModelo=toObservable(this.modelo);
    this.cuandoCambiaModelo.subscribe(value=>{
      debugger;
      this.valorVisible=this.FormatoValorVisible();
    })
  }

  ngOnInit() {

  }

  FormatoValorVisible():any {
    debugger;
    let val:any=this.modelo();
    let puntero:any=val;
    if(puntero==null || puntero==undefined) {
      puntero="";
    } else {
      if(this.ValorVisibleModelo.trim()!="") {
        let formato=this.ValorVisibleModelo.split("/");
        let clave:string="";
        let indice:number=0;
        for(let i=0;i<formato.length;i++) {      
          if(formato.indexOf("(")>=0) {
            clave=formato[i].substring(0,formato.indexOf("("));
            indice=parseInt(formato[i].substring(formato.indexOf("(")+1,formato.indexOf(")")-1));        
          } else {
            clave=formato[i].trim();
            indice=-1;
          }
          puntero=puntero[clave];
          if(indice>=0) {
            puntero=puntero[indice];
          }
        }
      } else {
          puntero=this.modelo();
      }
      //Aplicacion de formatos por defectos
      if(this.CadenaFormato.trim()=="") {
        if(this.Tipo=="DateTime"){
          this.CadenaFormato=environment.config.formats.date.dateShortFormat;
        }
      }
      //Formatos de valores especiales      
      if(this.CadenaFormato.trim()!="") {
        switch(this.Tipo) {
          case "DateTime":
              //puntero=formatDate(puntero,this.CadenaFormato,'es-ES');
              try {
                puntero=puntero.split("T")[0].split("-")[2]+"/"+puntero.split("T")[0].split("-")[1]+"/"+puntero.split("T")[0].split("-")[0];
              } catch(ex) {
                puntero=puntero;
              }
            break;
        }
      }
    }
    this.onCuandoCambiaValorMostrado.emit(puntero);
    return puntero;
  }


  CambiaModoEdicion() {
    this.ModoEditable.set(!this.ModoEditable());
  }

}
