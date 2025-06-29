import { Component, Input, OnDestroy } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ElementoAplicacionModel } from '@app/data/interfaces/ElementoAplicacionModel';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { TipoPermisoElementoModel } from '@app/data/interfaces/PermisoElemento/TipoPermisoElementoModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { AdministracionGruposPermisosService } from '@app/data/services/api/AdministracionGruposPermisosService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {ModalBuscarElementoAplicacionComponent} from './../modal-buscar-elemento-aplicacion/modal-buscar-elemento-aplicacion.component';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-modal-alta-nuevo-permiso-elemento-aplicacion',
  standalone: false,
  templateUrl: './modal-alta-nuevo-permiso-elemento-aplicacion.component.html',
  styleUrl: './modal-alta-nuevo-permiso-elemento-aplicacion.component.less',
  providers:[DialogService]
})
export class ModalAltaNuevoPermisoElementoAplicacionComponent implements OnDestroy {
  @Input()
  aplicacion:AplicacionModel|null=null;

  @Input()
  grupo:GrupoModel|null=null;

  @Input()
  elemento:ElementoAplicacionModel|null=null;

  tiposPermisos:TipoPermisoElementoModel[]=[];

  tipoPermiso:TipoPermisoElementoModel|null=null;

  opciones:MenuItem[]=[];

  constructor(private ref:DynamicDialogRef,
              private dlg:DialogService,
              private admGru:AdministracionGruposPermisosService,
              private admApl:AdministracionAplicacionesService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.opciones.push({
      label:"Guardar",
      icon:PrimeIcons.SAVE,
      command:()=>{this.GuardarPermiso()}
    })
  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }


  BuscarElementoAplicacion() {
    this.dlg.open(ModalBuscarElementoAplicacionComponent, {
            header:"Buscar elemento",     
            modal:true,
            width:'100vm',
            contentStyle:{overflow:'auto'},
            appendTo:'body',
            closable:true,
            inputValues:{
              aplicacion:this.aplicacion
            } 
          }).onClose.subscribe((data)=>{
            if(data!=null) {
              this.elemento=data;
              this.admApl.TipoPermisoPorTipoElemento(this.elemento?.tipoElemento?.codigo??"").subscribe({
                next:(lst)=>{
                  this.tiposPermisos=lst;
                },
                error:(err)=>{
                  this.msg.mensaje.set({tipo:'error',titulo:'Tipos de permisos',detalle:`No se han podido obtener los permisos del tipo de elemento seleccionado, causa: ${err}`});
                }
              });              
            }
          });
  }

  GuardarPermiso() {
    if(this.grupo && this.elemento && this.tipoPermiso) {
      this.admApl.AltaElementoPermiso({
        idGrupo:this.grupo.id??"",
        idElementoAplicacion:this.elemento.id??"",
        codigoTipoPermiso:this.tipoPermiso.codigo
      }).subscribe({
        next:(data)=>{
          this.ref.close();
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Alta de permiso',detalle:`No se ha podido dar de alta el permiso, causa: ${err}`});
        }
      })
    } else {
      this.msg.mensaje.set({tipo:'warm',titulo:'Datos incompletos',detalle:'Debe rellenar todos los datos'});
    }
  }

}
