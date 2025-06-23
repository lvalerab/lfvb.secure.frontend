import { Component, OnDestroy, WritableSignal, signal } from '@angular/core';
import { AltaAplicacionModel } from '@app/data/interfaces/AltaAplicacionModel/AltaAplicacionModel';
import { ElementoAplicacionModel } from '@app/data/interfaces/ElementoAplicacionModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TipoElementoAplicacionModel } from '@app/data/interfaces/TipoElementoAplicacionModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalNuevaPropiedadComponent } from '../modal-nueva-propiedad/modal-nueva-propiedad.component';

@Component({
  selector: 'app-modal-alta-nueva-aplicacion',
  standalone: false,
  templateUrl: './modal-alta-nueva-aplicacion.component.html',
  styleUrl: './modal-alta-nueva-aplicacion.component.less',
  providers:[DialogService]
})
export class ModalAltaNuevaAplicacionComponent implements OnDestroy {
  aplicacion:AltaAplicacionModel={codigo:"",nombre:"",elementos:[],grupos:[],propiedades:[]};
  
  propiedades:any[]=[];
  propiedadActual:WritableSignal<PropiedadModel|null>=signal(null);
  listaElementos:any[]=[];
  opcionesPropiedades:MenuItem[]=[];
  opcionesElementos:MenuItem[]=[];

  tiposElementos:TipoElementoAplicacionModel[]=[];
  elementoActual:ElementoAplicacionModel={id:"",codigo:"",aplicacion:null,nombre:"",padre:null,tipoElemento:null, elementos:[]};

  constructor(private dlg:DialogService,
              private ref:DynamicDialogRef,
              private msg:ToastService,
              private admAplicacionServ:AdministracionAplicacionesService,
              private admPropServ:PropiedadesApiService
  ) {

  }

  ngOnInit() {
    this.configuraOpcionesPropiedades();
    this.configuraOpcionesElementos();
  }

  configuraOpcionesPropiedades() {
    this.opcionesPropiedades=[];
    this.opcionesPropiedades.push({
      label:'Añade propiedad',
      icon:PrimeIcons.PLUS,
      command:()=>this.ModalAltaPropiedad()
    });
    this.opcionesPropiedades.push({
      label:'Eliminar propiedad',
      icon:PrimeIcons.MINUS
    })
  }

  ModalAltaPropiedad() {
    this.dlg.open(ModalNuevaPropiedadComponent,{
        header:"Nueva propiedad para la aplicacion",     
        modal:true,
        width:'50vm',
        contentStyle:{overflow:'auto'},
        appendTo:'body',
        closable:true
    });
  }

  configuraOpcionesElementos() {
    this.opcionesElementos=[];  
    this.opcionesElementos.push({
      label:'Añade elemento',
      icon:PrimeIcons.PLUS
    });
    this.opcionesElementos.push({
      label:'Eliminar elemento',
      icon:PrimeIcons.MINUS
    })
  }
  
  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }

  OnChangePropiedad(event:any) {

  }


  AltaApliacion() {

  }
}
