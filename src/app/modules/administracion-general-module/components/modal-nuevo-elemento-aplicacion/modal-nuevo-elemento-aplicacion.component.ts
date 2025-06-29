import { Component,Input, OnDestroy } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ElementoAplicacionModel } from '@app/data/interfaces/ElementoAplicacionModel';
import { TipoElementoAplicacionModel } from '@app/data/interfaces/TipoElementoAplicacionModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { constantes } from 'src/const/constantes';
import { MenuItem } from 'primeng/api';
import { ModalBuscarElementoAplicacionComponent } from '../modal-buscar-elemento-aplicacion/modal-buscar-elemento-aplicacion.component';

@Component({
  selector: 'app-modal-nuevo-elemento-aplicacion',
  standalone: false,
  templateUrl: './modal-nuevo-elemento-aplicacion.component.html',
  styleUrl: './modal-nuevo-elemento-aplicacion.component.less',
  providers:[DialogService]
})
export class ModalNuevoElementoAplicacionComponent implements OnDestroy {

    @Input()
    public elementos:any[]=[];


    @Input()
    public aplicacion:AplicacionModel={
      id:constantes.guid.zero,
      nombre:"",
      codigo:"",
      elementos:[],
      grupos:[]
    };

    @Input()
    public elemento:ElementoAplicacionModel={
      id:constantes.guid.zero,
      aplicacion:this.aplicacion,
      codigo:"",
      nombre:"",
      elementos:[],
      padre:null,
      tipoElemento:null
    };

    TiposElementos:TipoElementoAplicacionModel[]=[];
    opciones:MenuItem[]=[];

    constructor(private admAplServ:AdministracionAplicacionesService,
                private msg:ToastService,
                private dlg:DialogService,
                private ref:DynamicDialogRef
    ) {

    }

    ngOnInit() {
      this.GetTiposElementos();
      this.ConfiguraOpciones();
    }

    ngOnDestroy(): void {
      if(this.ref) {
        this.ref.destroy();
      }
    }

    ConfiguraOpciones() {
      this.opciones=[];
      this.opciones.push({
        label:"Guardar",
        icon:"pi pi-save",
        command:()=>{this.GuardarElemento();}
      })
    }

    GetTiposElementos() {
      this.admAplServ.ElementosTipos().subscribe({
        next:(lst)=>{
          this.TiposElementos=lst;
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de tipos de elementos',detalle:`No se ha podido obtener el listado de tipos de elementos, causa ${err}`});
        }
      })
    }

    OnCuandoBuscaElementoPadre(event:any) {
      this.dlg.open(ModalBuscarElementoAplicacionComponent, {
        header:"Buscar elemento padre",     
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
          this.elemento.padre=data;
        }
      });
    }

    GuardarElemento() {
      this.elemento.aplicacion=this.aplicacion;
      if(this.elemento.aplicacion!=null && this.elemento.tipoElemento!=null && this.elemento.codigo!=null && this.elemento.codigo!="" && this.elemento.nombre!="") {
        if(this.elemento.id==null || constantes.guid.isZero(this.elemento.id)) {
          this.elemento.id=null;
          this.admAplServ.ElementoAlta(this.elemento).subscribe({
            next:(elem)=>{
              this.ref.close(elem);
            },
            error:(err)=>{
              this.msg.mensaje.set({tipo:'error',titulo:'Alta elemento',detalle:`No se ha podido dar de alta el elemento, causa: ${err}`});
            }
          });
        } else {
          this.admAplServ.ElementoActualizar(this.elemento).subscribe({
            next:(elem)=>{
              this.ref.close(elem);
            },
            error:(err)=>{
              this.msg.mensaje.set({tipo:'error',titulo:'Actualizar elemento',detalle:`No se ha podido actualizar el elemento, causa: ${err}`});
            }
          });
        }
      }
    }
}
