import { Component, Input, Output, WritableSignal, Signal, signal, EventEmitter  } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { TextoModel } from '@app/data/interfaces/i18N/Textos/TextoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { I18NGlobalService } from '../../services/I18NGlobalService';
import { MenuItem } from 'primeng/api';
import { constantes } from 'src/const/constantes';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-editor-textos-idiomas',
  standalone: false,
  templateUrl: './editor-textos-idiomas.component.html',
  styleUrl: './editor-textos-idiomas.component.less',
})
export class EditorTextosIdiomasComponent {
  @Input()
  titulo:string|undefined;

  @Input()
  cerrarAlGuardar:boolean=false;

  @Input()
  texto:TextoModel|undefined|null;

  @Input()
  idiomaSel:WritableSignal<IdiomaModel|undefined|null>=signal(undefined);

  @Output()
  cuandoGuardaTexto=new EventEmitter<TextoModel>();

  listaIdiomas:IdiomaModel[]=[];


  coltexto1:string="";
  coltexto2:string="";
  
  opciones:MenuItem[]=[];

  constructor(private i18Srv:i18NService,
              private i18Glb:I18NGlobalService,
              private msg:ToastService,
              private dlgRef:DynamicDialogRef
  ) {

  }

  ngOnInit() {
    this.GetListaIdiomas();   
    this.ConfiguraMenu();  
    
  }

  ConfiguraElementoInicial() {
    if(this.texto?.id==constantes.guid.zero)  {
      this.texto.textos=[];
      for(var idio in this.listaIdiomas) {
        if(!this.listaIdiomas[idio].multiple) {
          this.texto.textos.push({
            id:constantes.guid.zero,
            idioma:this.listaIdiomas[idio],
            texto:""
          });
        }
      }
      this.texto.variables=[]; 
      this.coltexto1="";     
    } else {
      //Establecemos el texto del idioma seleccionado
      var ci=this.idiomaSel()?.codigo;
      var aux=this.texto?.textos?.filter(t=>t.idioma?.codigo==ci);
      if(aux && aux?.length>0) {
        this.coltexto1=aux[0].texto??"";
      }
    }
  }

  ConfiguraMenu() {
    let aux:MenuItem[]=[];

    aux.push({
      label:"Guardar",
      icon:'pi pi-safe',
      command:()=>this.Guardar()
    })

    aux.push({
      separator:true
    });

    aux.push({
      label:"Nueva variable",
      icon:"pi pi-plus-circle",
      command:()=>this.ModalNuevaVariable()
    })

    aux.push({
      label:"Eliminar variable",
      icon:"pi pi-times-circle",
      command:()=>this.EliminarVariable()
    })

    aux.push({
      separator:true
    })

    aux.push({
      label:"Usar traductor externo",
      icon:"pi pi-language",
      command:()=>this.ModalTraductorExterno()
    })

    this.opciones=aux;
  }

  GetListaIdiomas() {
    this.i18Srv.ListaTodos().subscribe({
      next:(values)=>{
        this.listaIdiomas=values;
         if(this.idiomaSel()==null || this.idiomaSel()==undefined) {
          let aux=this.listaIdiomas.filter(i=>i.codigo==this.i18Glb.idioma()?.codigo);
          if(aux.length>0) {
            this.idiomaSel.set(aux[0]);
            this.ConfiguraElementoInicial();
          }
        }
      },
      error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Lista de idiomas',detalle:`No es posible obtener el listado completo de idiomas, causa ${error.message}`})
    })
  }

  CuandoCambiaIdioma(idioma:any) {
    debugger;
    //guardamos el texto antiguo si existe antes de cambiar el idioma
    if(this.idiomaSel()?.multiple) {

    } else {
      var cant=this.idiomaSel()?.codigo;
      if(cant) {
        var aux=this.texto?.textos?.filter(tx=>tx.idioma?.codigo==cant);
        if(aux && aux.length>0) {
          aux[0].texto=this.coltexto1;
        } else {
          if(this.texto && this.texto.textos) {
              this.texto.textos.push({
                id:this.texto.id,
                idioma:{                  
                  codigo:cant,
                  nombre:this.idiomaSel()?.nombre??"",
                  orden:null,
                  multiple:this.idiomaSel()?.multiple??false,
                  propiedades:[],
                  componentes:[]
                },
                texto:this.coltexto1
              })
          }
        }
      }
    }
    //Cambiamos el idioma
    this.idiomaSel.set(idioma);
    //Establecemos las variables del texto 
    if(idioma.multiple) {

    } else {
      if(this.texto?.textos) {
        aux=this.texto?.textos.filter(tx=>tx.idioma?.codigo==idioma.codigo);
        if(aux && aux.length>0) {
          this.coltexto1=aux[0].texto??"";
        }
      }
    }
  }

  Guardar() {
    this.CuandoCambiaIdioma(this.idiomaSel()); //Para forzar el guardado del dato actual
    if(this.texto) {
      if(this.texto?.id==constantes.guid.zero) {
        this.i18Srv.AltaTexto(this.texto).subscribe({
          next:(valor)=>{
            this.texto=valor;
            if(this.cerrarAlGuardar && this.dlgRef) {
              this.dlgRef.close(this.texto);
            }
          },
          error:(error)=>this.msg.mensaje.set({tipo:"error",titulo:"Guardar nuevo texto",detalle:`No es posible guardar el texto, causa: ${error.message}`})
        });
      } else {
        this.i18Srv.ModificaTexto(this.texto).subscribe({
          next:(valor)=>{
            this.texto=valor;
            if(this.cerrarAlGuardar && this.dlgRef) {
              this.dlgRef.close(this.texto);
            }
          },
          error:(error)=>this.msg.mensaje.set({tipo:"error",titulo:"Guardar texto",detalle:`No es posible guardar el texto, causa: ${error.message}`})
        });
      }
    }
  }

  ModalNuevaVariable() {

  }

  EliminarVariable() {

  }

  ModalTraductorExterno() {

  }
}
