import { Component,Input, Output,EventEmitter,WritableSignal,signal } from '@angular/core';

import { ColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel';
import { ConsultaPermisoModel } from '@app/data/interfaces/PermisoElemento/ConsultaPermisoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { PermisosService } from '@app/shared/services/PermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {FichaColeccionComponent} from '../ficha-coleccion/ficha-coleccion.component';
import { constantes } from 'src/const/constantes';


@Component({
  selector: 'app-lista-composiciones',
  standalone: false,
  templateUrl: './lista-composiciones.component.html',
  styleUrl: './lista-composiciones.component.less',
  providers:[DialogService]
})
export class ListaComposicionesComponent {

  @Input()
  seleccion:boolean=false;

  @Output()
  cuandoSeleccionaColeccion=new EventEmitter<ColeccionTextoModel>();
  
  colecciones:ColeccionTextoModel[]=[];

  opciones:WritableSignal<MenuItem[]>=signal([]);

  refDlg:DynamicDialogRef|undefined;
  
  constructor(private i18Nserv:i18NService,
              private msg:ToastService,     
              private permServ:PermisosService,
              private dlg:DialogService
  ) {
    this.GetPermisos();
  }

  ngOnInit() {
    this.GetListaColecciones();    
  }

   GetPermisos() {
      let permisos:ConsultaPermisoModel[]=[
        {idApli:"GEST_COMP_TEXTOS",idElap:"BTN_ALT_CLTX",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
        {idApli:"GEST_COMP_TEXTOS",idElap:"BTN_EDIT_CLTX",nombre:"PERMI_EJC",codigoTipoPermiso:[]},
      ]
  
      this.permServ.ConsultaPermisos(permisos); 
      this.ConfiguraMenu(this.PuedeVerBoton("BTN_ALT_CLTX","PERMI_EJC"));
  }

  ConfiguraMenu(permiso:boolean) {
    let aux:MenuItem[]=[];
    //if(permiso) {
      aux.push({
        label:"Nueva composición",
        icon:'pi pi-plus',
        command:()=>{
          this.ModalFichaColeccion({
            id:constantes.guid.zero,
            nombre:"",
            detalle:"",
            Campos:[]
          });
        }
      })
    //}
    this.opciones.set(aux);
  }

  GetListaColecciones() {
    this.i18Nserv.ColeccionesLista().subscribe({
      next:(listado)=>this.colecciones=listado,
      error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Lista de colecciones',detalle:`Error al obtener el listado de colecciones, causa: ${error.message}`})
    });
  }

  PuedeVerBoton(btn:string,perm:string):boolean {
    return this.permServ.PuedeVer(btn,perm);
  }

  OnBtnModificaColeccion(coleccion:ColeccionTextoModel) {
    this.ModalFichaColeccion(coleccion);
  }

  OnBtnSeleccionaColeccion(coleccion:ColeccionTextoModel) {
    this.cuandoSeleccionaColeccion.emit(coleccion);
  }


  ModalFichaColeccion(coleccion:ColeccionTextoModel) {
    this.refDlg=this.dlg.open(FichaColeccionComponent,{
      header:'Ficha de colección',
      width:'50vw',
      modal:true,
      closable:true,
      maximizable:true,
      inputValues:{
        id:coleccion.id==constantes.guid.zero?null:coleccion.id,
        modal:true
      }
    });

    this.refDlg.onClose.subscribe(()=>{
      this.GetListaColecciones();
    });
  }
}
