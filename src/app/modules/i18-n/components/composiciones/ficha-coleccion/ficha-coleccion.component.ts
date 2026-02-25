import { Component,Input, WritableSignal, signal } from '@angular/core';
import { CampoColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/CampoColeccionTextoModel';
import { ColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel';
import { OpcionCampoColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/OpcionCampoColeccionTextoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { I18NGlobalService } from '@app/modules/i18-n/services/I18NGlobalService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { constantes } from 'src/const/constantes';
import {BuscadorTextosComponent} from '../../buscador-textos/buscador-textos.component';

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

  ref:DynamicDialogRef|undefined;

  constructor(private i18nServ:i18NService,
              private i18nGbl:I18NGlobalService,
              private msg:ToastService,
              private dlg:DialogService
  ) {

  }

  ngOnInit() {
    this.GetColeccion();
  }

  GetColeccion() {
    if(this.id==undefined || this.id==null) {
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

  ConfiguraMenuColeccion() {
    this.menuColeccion=[];

    this.menuColeccion.push({
      icon:'pi pi-file-plus',
      label:'Nueva',
      tooltip:'Nueva coleccion'
    });

    this.menuColeccion.push({
      icon:'pi pi-save',
      label:'Guardar',
      tooltip:'Guardar datos de la colección'
    });

    if(this.coleccion && this.coleccion.id) {
      this.menuColeccion.push({
        icon:'pi pi-times',
        label:'Eliminar',
        tooltip:'Eliminar colección'
      })
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
        tooltip:'Eliminar campo'
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
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Obtención del campo de la composición",detalle:`No se ha podido obtener el campo de la composición, causa ${error.message}`});
        }
      });
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
        tooltip:'Eliminar opcion'
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

  GuardarOpcion() {

  }

  OnCuandoCambiaPestanyaOpcion(event:any) {    
    if(event) {
      if(event=="nuevo") {
        this.OpcionActual.set({id:constantes.guid.zero, nombre:"",campo:this.CampoActual(), texto:undefined});
        this.ConfiguraMenuOpcion(true);
      } else {
        this.i18nServ.ColeccionCampoOpcion(event,this.CampoActual()?.id??constantes.guid.zero,this.coleccion.id??constantes.guid.zero).subscribe({
          next:(value)=>{
            this.OpcionActual.set(value);
            this.ConfiguraMenuOpcion(false);
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
    this.ref=this.dlg.open(BuscadorTextosComponent,{
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
      let aux=this.OpcionActual();
      if(aux) {
        if(texto) {
          aux.texto=texto;
          this.OpcionActual.set(aux);
        }
      }
    })
  }
}
