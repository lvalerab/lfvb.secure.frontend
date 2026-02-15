import { Component,Input, Output,EventEmitter,WritableSignal,signal } from '@angular/core';

import { ColeccionTextoModel } from '@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel';
import { ConsultaPermisoModel } from '@app/data/interfaces/PermisoElemento/ConsultaPermisoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { PermisosService } from '@app/shared/services/PermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-lista-composiciones',
  standalone: false,
  templateUrl: './lista-composiciones.component.html',
  styleUrl: './lista-composiciones.component.less',
})
export class ListaComposicionesComponent {

  @Input()
  seleccion:boolean=false;

  @Output()
  cuandoSeleccionaColeccion=new EventEmitter<ColeccionTextoModel>();
  
  colecciones:ColeccionTextoModel[]=[];

  opciones:WritableSignal<MenuItem[]>=signal([]);
  
  constructor(private i18Nserv:i18NService,
              private msg:ToastService,     
              private permServ:PermisosService
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
    if(permiso) {

    }
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

  }

  OnBtnSeleccionaColeccion(coleccion:ColeccionTextoModel) {
    this.cuandoSeleccionaColeccion.emit(coleccion);
  }
}
