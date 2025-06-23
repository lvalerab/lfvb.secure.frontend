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
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';

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
  correcto:boolean=true;

  tiposElementos:TipoElementoAplicacionModel[]=[];
  elementoActual:ElementoAplicacionModel={id:"",codigo:"",aplicacion:null,nombre:"",padre:null,tipoElemento:null, elementos:[]};

  constructor(private dlg:DialogService,
              private ref:DynamicDialogRef,
              private msg:ToastService,
              private admAplicacionServ:AdministracionAplicacionesService,
              private admPropServ:PropiedadesApiService
  ) {

  }

  listaApp:AplicacionModel[]=[];

  ngOnInit() {
    this.configuraOpcionesPropiedades();
    this.configuraOpcionesElementos();
    this.admAplicacionServ.Lista().subscribe({
      next:(lst)=>{
        this.listaApp=lst;
        this.correcto=true;
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Lista de aplicaciones',detalle:'No se ha podido obtener la lista de aplicaciones'});
        this.correcto=false;
      }
    })
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

  ValidarCodigoAplicacion(evento:Event) {
    let appExistentes=this.listaApp.filter(a=>a.codigo==this.aplicacion.codigo);
    this.correcto=true;
    if(appExistentes.length>0) {      
      this.aplicacion.codigo=this.aplicacion.codigo+"_"+(appExistentes.length);
      this.msg.mensaje.set({tipo:'warm',titulo:'Codigo existente',detalle:'Ya existe una aplicación con ese codigo'});
    }
  }

  OnChangePropiedad(event:any) {

  }


  AltaApliacion() {
    this.admAplicacionServ.Alta(this.aplicacion).subscribe({
      next:(apl)=>{
        this.msg.mensaje.set({tipo:'success',titulo:'Alta aplicación',detalle:'Se ha dado de alta la nueva aplicación'});
        this.ref.close(apl);
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Alta aplicación',detalle:`Ha ocurrido un error al dar de alta la aplicación, causa: ${err}`});
      }
    });
  }
}
