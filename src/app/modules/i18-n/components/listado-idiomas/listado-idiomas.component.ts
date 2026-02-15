import { Component,WritableSignal, signal } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { ConsultaPermisoModel } from '@app/data/interfaces/PermisoElemento/ConsultaPermisoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { PermisosService } from '@app/shared/services/PermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FichaIdiomaComponent } from '../ficha-idioma/ficha-idioma.component';


@Component({
  selector: 'app-listado-idiomas',
  standalone: false,
  templateUrl: './listado-idiomas.component.html',
  styleUrl: './listado-idiomas.component.less',
  providers:[DialogService]
})
export class ListadoIdiomasComponent {
  idiomas:IdiomaModel[]=[];
  
  Opciones:WritableSignal<MenuItem[]>=signal([]);

  ref:DynamicDialogRef|undefined;

  constructor(private i18NServ:i18NService,
              private msg:ToastService,
              private dlg:DialogService,     
              private permServ:PermisosService
  ) {
    this.GetPermisos(); 
    /*this.permServ.CuandoAsignaPermisos.subscribe((value)=>{         
      if(value) {
        this.ConfiguraMenu(this.permServ.PuedeVer("BTN_ALTA_IDIOMA","PERMI_EJC"));
      }
    }); */
  }

  ngOnInit() {
    this.GetListaIdiomas();   
  }

  GetPermisos() {
    let permisos:ConsultaPermisoModel[]=[
      {idApli:"ADM_IDIOMAS",idElap:"BTN_ALTA_IDIOMA",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
      {idApli:"ADM_IDIOMAS",idElap:"BTN_MODIFICA_IDIOMA",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
    ]

    this.permServ.ConsultaPermisos(permisos); 
    this.ConfiguraMenu(this.PuedeVerBoton("BTN_ALTA_IDIOMA","PERMI_EJC"));
  }

  PuedeVerBoton(boton:string, permiso:string) {
    return this.permServ.PuedeVer(boton,permiso);
  }

  ConfiguraMenu(valido:boolean) {    
    this.Opciones.set([]);    
      if(valido) {        
        this.Opciones().push({
          label:'Nuevo idioma',
          icon:'pi pi-plus',        
          command:(event)=>this.MostrarDialogoIdioma("Nuevo idioma",{codigo:"",nombre:"",multiple:false,componentes:[], orden:null, propiedades:[]},true)
        });
      }
  }
 
  GetListaIdiomas() {
    this.i18NServ.ListaTodos().subscribe({
      next:(values)=>{
        this.idiomas=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Obtencion de lista de idiomas",detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`});
      }
    });
  }


  MostrarDialogoIdioma(titulo:string, idioma:IdiomaModel, nuevo:boolean=false) {
    this.ref=this.dlg.open(FichaIdiomaComponent,{
      header:titulo,
      closable:true,
      maximizable:true,
      modal:true,
      inputValues:{
        idioma:idioma,
        nuevo:nuevo
      }
    });
    
    this.ref.onClose.subscribe(()=>{
      this.GetListaIdiomas();
      this.ref?.destroy();
    });
  }

  OnBtnModificaIdioma(idioma:IdiomaModel) {
    this.MostrarDialogoIdioma("Modifica idioma existente",idioma,false);
  }
}
