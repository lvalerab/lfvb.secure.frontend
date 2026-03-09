import { Component,Input, WritableSignal, signal } from '@angular/core';
import { CampoColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/CampoColeccionTextoModel';
import { ColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel';
import { OpcionCampoColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/OpcionCampoColeccionTextoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { I18NGlobalService } from '@app/modules/i18-n/services/I18NGlobalService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { constantes } from 'src/const/constantes';
import {BuscadorTextosComponent} from '../../buscador-textos/buscador-textos.component';
import { ModalBuscadorTextosComponent } from '../../modal-buscador-textos/modal-buscador-textos.component';
import { ConfirmService } from '@app/shared/services/ConfirmService';
import { TextoModel } from '@app/data/interfaces/i18N/Textos/TextoModel';

@Component({
  selector: 'app-ficha-coleccion',
  standalone: false,
  templateUrl: './ficha-coleccion.component.html',
  styleUrl: './ficha-coleccion.component.less',
  providers:[DialogService]
})
export class FichaColeccionComponent {

  @Input()
  id:string|null|undefined;

  @Input()
  modal:boolean=false;


  coleccion:ColeccionTextoModel={
        id:undefined,
        nombre:"",
        detalle:"",
        Campos:[]
  };

  pCampo:string="";
  pOpcion:string="";

  Campos:WritableSignal<CampoColeccionTextoModel[]>=signal([]);

  CampoActual:WritableSignal<CampoColeccionTextoModel|undefined>=signal(undefined);

  Opciones:WritableSignal<OpcionCampoColeccionTextoModel[]>=signal([]);

  menuColeccion:MenuItem[]=[];
  menuCampo:WritableSignal<MenuItem[]>=signal([]);
  menuOpcion:WritableSignal<MenuItem[]>=signal([]);

  OpcionActual:WritableSignal<OpcionCampoColeccionTextoModel|undefined>=signal(undefined);

  TextoActual:WritableSignal<TextoModel|undefined>=signal(undefined);

  ref:DynamicDialogRef|undefined;

  constructor(private i18nServ:i18NService,
              private i18nGbl:I18NGlobalService,
              private msg:ToastService,
              private dlg:DialogService,
              private CnfDlg:ConfirmService
  ) {

  }

  ngOnInit() {
    this.GetColeccion();
  }

  GetColeccion() {
    if(this.id==undefined || this.id==null || this.id==constantes.guid.zero) {
      this.coleccion={
        id:undefined,
        nombre:"",
        detalle:"",
        Campos:[]
      };
      this.ConfiguraMenuColeccion();
    } else {
       this.i18nServ.Coleccion(this.id).subscribe({
        next:(value)=>{
          this.coleccion=value;
          this.ConfiguraMenuColeccion();          
          if(this.coleccion) {
            this.GetCamposColeccion();
          }
        },
        error:(error)=>this.msg.mensaje.set({tipo:"error",titulo:"Datos de la colección",detalle:`No es posible la coleccion de textos, causa ${error.message}`})
      });
    }
  }

  GetCamposColeccion() {
    this.i18nServ.ColeccionCampos(this.coleccion.id??"").subscribe({
      next:(campos)=>{
        if(this.coleccion)
          this.coleccion.Campos=campos;
          this.Campos.set(campos);
      },
      error:(error)=>this.msg.mensaje.set({tipo:"error",titulo:"Lista de campos",detalle:`No es posible obtener el listado de campos, causa ${error.message}`})
    });
  }

  EliminarColeccion(event:MenuItemCommandEvent) {
    this.CnfDlg.mensaje.set({
          target:event?.originalEvent?.currentTarget,
          titulo:"Eliminar colección",
          mensaje:"¿Quiere eliminar la colección actual?",
          severityYes:"success",
          severityNo:"danger",
          textoYes:"Si",
          textoNo:"No",
          icono:"pi pi-times",
          funcionYes:()=>{
            this.i18nServ.EliminarColeccion(this.coleccion.id??constantes.guid.zero,false).subscribe({
              next:(hecho)=>{
                if(this.ref) {
                  this.ref.close();
                }
              },
              error:(error)=>{
                this.msg.mensaje.set({tipo:"error",titulo:"Eliminar colección",detalle:`No es posible eliminar la coleccion, causa, ${error.message}`});
              }
            });
          },
          funcionNo:()=>{
            
          }
        });
  }

  ConfiguraMenuColeccion() {
    this.menuColeccion=[];

   
    this.menuColeccion.push({
      icon:'pi pi-save',
      label:'Guardar',
      tooltip:'Guardar datos de la colección',
      command:()=>{
        this.GuardarColeccion();
      }
    });

    if(this.coleccion && this.coleccion.id) {
      this.menuColeccion.push({
        icon:'pi pi-times',
        label:'Eliminar',
        tooltip:'Eliminar colección',
        command:($event)=>{
          this.EliminarColeccion($event);
        }
      })
    }
  }

  GuardarColeccion() {
    if(this.coleccion.id==null || this.coleccion.id==constantes.guid.zero) {
      this.i18nServ.AltaColeccion(this.coleccion).subscribe({
        next:(col)=>{
          this.id=col.id;
          this.GetColeccion();
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Guardar colección nueva",detalle:`No es posible guardar la colección actual, causa: ${error.message}`});
        }
      });
    } else {
      this.i18nServ.ModificarColeccion(this.coleccion).subscribe({
        next:(col)=>{
          this.id=col.id;
          this.GetColeccion();
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Guardar colección",detalle:`No es posible guardar la colección actual, causa: ${error.message}`});
        }
      });
    }
  }

  ConfiguraMenuCampo(nuevo:boolean) {    
    let aux:MenuItem[]=[];
    if(!nuevo) {
      aux.push({
        icon:'pi pi-file-plus',
        label:'Nuevo',
        tooltip:'Nuevo campo',
        command:()=>{
          this.CampoActual.set({id:constantes.guid.zero, nombre:"",coleccion:this.coleccion});
          this.pCampo="nuevo";
        }
      });
    }

    //Solo puede guardar
    aux.push({
      icon:'pi pi-save',
      label:'Guardar',
      tooltip:'Guardar campo',
      command:()=>this.GuardarCampo()
    });

    if(!nuevo) {
      aux.push({
        icon:'pi pi-times',
        label:'Eliminar',
        tooltip:'Eliminar campo',
        command:($event)=>{
          this.EliminarCampo($event);
        }
      });
    }
    this.menuCampo.set(aux);
  }

  GuardarCampo() {
    debugger;
    if(this.CampoActual()!=undefined) {      
      if(this.CampoActual()?.id!=constantes.guid.zero) {
        //Es una modificación del campo
        this.i18nServ.ModificarCampoColeccion(this.CampoActual()??{id:constantes.guid.zero, nombre:"",coleccion:this.coleccion}).subscribe({
          next:(value)=>{            
            this.CampoActual.set(value);
            this.GetCamposColeccion();
            this.ConfiguraMenuCampo(value.id!=constantes.guid.zero);
            this.pCampo=value.id??"nuevo";
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar nuevo campo",detalle:`No se ha podido guardar el nuevo campo, causa: ${error.message}`});
          }
        });
      } else {
        //Es un campo nuevo
        this.i18nServ.AltaCampoColeccion(this.CampoActual()??{id:constantes.guid.zero, nombre:"",coleccion:this.coleccion}).subscribe({
          next:(value)=>{
            this.CampoActual.set(value);
            this.GetCamposColeccion();
            this.ConfiguraMenuCampo(value.id!=constantes.guid.zero);
            this.pCampo=value.id??"nuevo";
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar nuevo campo",detalle:`No se ha podido guardar el nuevo campo, causa: ${error.message}`});
          }
        });
      }
    }
  }

  EliminarCampo(event:MenuItemCommandEvent) {
     this.CnfDlg.mensaje.set({
            target:event?.originalEvent?.currentTarget,
            titulo:"Eliminar campo",
            mensaje:"¿Quiere eliminar el campo actual?",
            severityYes:"success",
            severityNo:"danger",
            textoYes:"Si",
            textoNo:"No",
            icono:"pi pi-times",
            funcionYes:()=>{
              this.i18nServ.EliminarCampoColeccion(this.CampoActual()?.id??constantes.guid.zero,false).subscribe({
                next:(hecho)=>{
                   this.GetCamposColeccion();
                   this.pOpcion="nuevo";
                   this.OnCuandoSeleccionaPestanya("nuevo");
                },
                error:(error)=>{
                  this.msg.mensaje.set({tipo:"error",titulo:"Eliminar campo",detalle:`No se ha podido eliminar el campo seleccionado, causa: ${error.message}`});
                }
              });
            },
            funcionNo:()=>{
              
            }
          });
  }

  onCuandoCambiaModeloNombreCampo(event:any) {    
    let aux:CampoColeccionTextoModel|undefined=this.CampoActual();
    if(aux) {
      aux.nombre=event;
      this.CampoActual.set(aux);      
    }
  }

  OnCuandoSeleccionaPestanya(event:any) {
    debugger;
    this.pOpcion="nuevo";
    this.ConfiguraMenuOpcion(true);
    if(event=="nuevo") {
      this.CampoActual.set({
        id:constantes.guid.zero,        
        coleccion:this.coleccion,
        nombre:""
      });
      this.ConfiguraMenuCampo(true);
    } else {
      this.i18nServ.ColeccionCampo(event,this.coleccion.id??"").subscribe({
        next:(value)=>{
          this.CampoActual.set(value);
          this.ConfiguraMenuCampo(false);
          this.GetOpcionesCampo();
          this.pOpcion="nuevo";
          this.OnCuandoCambiaPestanyaOpcion("nuevo");
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Obtención del campo de la composición",detalle:`No se ha podido obtener el campo de la composición, causa ${error.message}`});
        }
      });
    }
  }

  GetOpcionesCampo(loadIdOpcion:string="nuevo") {
    if(this.CampoActual()) {
      this.i18nServ.ColeccionCampoOpciones(this.CampoActual()?.id??constantes.guid.zero,this.coleccion.id??constantes.guid.zero).subscribe({
        next:(opcs)=>{
          this.Opciones.set(opcs);
          this.pOpcion=loadIdOpcion;
          this.OnCuandoCambiaPestanyaOpcion(loadIdOpcion);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Opciones del campo",detalle:`No es posible obtener las opciones del campo ${error.message}`});
        }
      })
    }
  }
  

  ConfiguraMenuOpcion(nuevo:boolean) {
     let aux:MenuItem[]=[];
    if(!nuevo) {
      aux.push({
        icon:'pi pi-file-plus',
        label:'Nueva',
        tooltip:'Nueva opcion',
        command:()=>{          
          this.pOpcion="nuevo";
        }
      });
    }

    //Solo puede guardar
    aux.push({
      icon:'pi pi-save',
      label:'Guardar',
      tooltip:'Guardar opción',
      command:()=>this.GuardarOpcion()
    });

    if(!nuevo) {
      aux.push({
        icon:'pi pi-times',
        label:'Eliminar',
        tooltip:'Eliminar opcion',
        command:($event)=>{
          this.EliminarOpcion($event);
        }
      });
    }

    aux.push({separator:true});

    aux.push({
      icon:'pi pi-search',
      label:'Asignar textos',
      tooltip:'Buscar y asigna un texto',
      command:()=>this.AbrirBuscadorTextos()
    });
    this.menuOpcion.set(aux);
  }


  EliminarOpcion(event:MenuItemCommandEvent) {
     this.CnfDlg.mensaje.set({
            target:event?.originalEvent?.currentTarget,
            titulo:"Eliminar opción",
            mensaje:"¿Quiere eliminar la opción actual?",
            severityYes:"success",
            severityNo:"danger",
            textoYes:"Si",
            textoNo:"No",
            icono:"pi pi-times",
            funcionYes:()=>{
              this.i18nServ.EliminarOpcionCampoColeccion(this.OpcionActual()?.id??constantes.guid.zero,false).subscribe({
                next:(hecho)=>{
                   this.GetOpcionesCampo("nuevo");                                      
                },
                error:(error)=>{
                  this.msg.mensaje.set({tipo:"error",titulo:"Eliminar opción",detalle:`No es posible eliminar la opción seleccionada, causa: ${error.message}`});
                  this.pOpcion=this.OpcionActual()?.id??"nuevo";
                }
              });
            },
            funcionNo:()=>{
              
            }
          });
  }

  GuardarOpcion() {
    if(this.OpcionActual() && this.OpcionActual()?.id==constantes.guid.zero) {
      let aux=this.OpcionActual();
      if(aux) {
        aux.texto=this.TextoActual();
        this.i18nServ.AltaOpcionCampoColeccion(aux).subscribe({
          next:(opc)=> {
            this.GetOpcionesCampo(opc.id??"nuevo");                    
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar opción campo",detalle:`No se ha podido guardar la nueva opcion, causa: ${error.message}`});
          }
        });
      }
    } else {
      let aux=this.OpcionActual();
      if(aux) {
        aux.texto=this.TextoActual();
        this.i18nServ.ModificaOpcionCampoColeccion(aux).subscribe({
          next:(opc)=> {          
            this.GetOpcionesCampo(opc.id??"nuevo");          
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Guardar opción campo",detalle:`No se ha podido guardar la opcion, causa: ${error.message}`});
          }
        });
      }
    }
  }

  OnCuandoCambiaPestanyaOpcion(event:any) {   
    if(event) {
      if(event=="nuevo") {
        this.OpcionActual.set({id:constantes.guid.zero, nombre:"",campo:this.CampoActual(), texto:undefined});
        this.TextoActual.set(undefined);
        this.ConfiguraMenuOpcion(true);
      } else {
        this.i18nServ.ColeccionCampoOpcion(event,this.CampoActual()?.id??constantes.guid.zero,this.coleccion.id??constantes.guid.zero).subscribe({
          next:(value)=>{    
            this.OpcionActual.set(value);
            this.ConfiguraMenuOpcion(false);
            if(value.texto?.id) {
              this.i18nServ.Texto(value.texto?.id).subscribe({
                next:(tex)=>{
                  this.TextoActual.set(tex);
                },
                error:(error)=>{
                  this.msg.mensaje.set({tipo:'error',titulo:'Obtener texto',detalle:`No es posible obtener el texto, causa: ${error.message}`});
                  this.TextoActual.set(undefined);                  
                }
              });
            } else {
              this.OpcionActual.set(value);
              this.TextoActual.set(undefined);
              this.ConfiguraMenuOpcion(false);
            }
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:"error",titulo:"Obtener opción",detalle:`No se ha podido obtener la opción, causa: ${error.message}`});
          }
        })
      }
    }
  }

  onCuandoCambiaModeloNombreOpcion(event:any) {
    let aux:OpcionCampoColeccionTextoModel|undefined=this.OpcionActual();
    if(aux) {
      aux.nombre=event;
      this.OpcionActual.set(aux);
    }
  }

  AbrirBuscadorTextos() {
    this.ref=this.dlg.open(ModalBuscadorTextosComponent,{
      maximizable:true,
      closable:true,
      modal:true,
      width:'50vw',
      inputValues:{
        seleccion:true,
        titulo:"Buscador de textos"
      }
    });

    this.ref.onClose.subscribe((texto)=>{
      debugger;
      let aux=this.OpcionActual();
      if(aux) {
        if(texto) {
          aux.texto=texto;
          this.OpcionActual.set(aux);
        }
      } else {
        let auxNuevo:OpcionCampoColeccionTextoModel={
          id:constantes.guid.zero,
          nombre:"",
          campo:this.CampoActual(),
          texto:texto
        };
        this.OpcionActual.set(aux);
      }
    })
  }
}
