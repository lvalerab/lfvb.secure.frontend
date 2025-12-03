import { Component,Input, WritableSignal,signal } from '@angular/core';
import { CircuitoModel } from '@data/interfaces/Circuitos/CircuitoModel';
import { EstadoElementoModel } from '@data/interfaces/EstadoElemento/EstadoElementoModel';
import { PasoModel } from '@data/interfaces/Pasos/PasoModel';
import { AdministracionCircuitosTramitacionService } from '@data/services/api/AdministracionCircuitosTramitacionService';
import { CoreService } from '@data/services/api/CoreService';
import { ToastService } from '@shared/services/ToastService';
import { constantes } from 'src/const/constantes';
import { MenuItem } from 'primeng/api';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { AccionPasoModel } from '@app/data/interfaces/Pasos/AccionPasoModel';

@Component({
  selector: 'app-ficha-paso',
  standalone: false,
  templateUrl: './ficha-paso.component.html',
  styleUrl: './ficha-paso.component.less',
})
export class FichaPasoComponent {

  @Input()
  paso:PasoModel={
    id:null,
    tramite:{
      id:null,
      nombre:null,
      descripcion:null,
      normativa:null
    },
    circuito:{
      id:"",
      activo:true,
      descripcion:"",
      fechaAlta:new Date(),
      fechaModificacion:new Date(),
      fechaBaja:null,
      nombre:"",
      normativa:"",
      tramite:{
        id:null,
        nombre:null,
        descripcion:null,
        normativa:null
      },
      tipos:[],
      grupos:[]
    },
    nombre:"",
    estado:{
      codigo:"",
      nombre:"",
      descripcion:"",
    },
    estadoNuevo:{
      codigo:"",
      nombre:"",
      descripcion:""
    },
    circuitoSiguiente:null,
    pasosSiguientes:[]
  };

   estados:EstadoElementoModel[]=[];
   circuitos:CircuitoModel[]=[];

   opciones:MenuItem[]=[];

   PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

   accionesPrepaso:AccionPasoModel[]=[];
   accionesPostpaso:AccionPasoModel[]=[];


   constructor(
    private msg:ToastService,
    private admCirc:AdministracionCircuitosTramitacionService,
    private crServ:CoreService
   ) {

   }

   ngOnInit() {
    this.getCircuitos();
    this.getEstados();
    this.getOpciones();
   }

   getCircuitos(todosLosTramites:boolean=false) {
    this.admCirc.ListaCircuitos({
      idTramite:(todosLosTramites?constantes.guid.zero:(this.paso.tramite?.id??constantes.guid.zero)),
      activo:true,
      nombre:"",
      page:null,
      regs:null
    }).subscribe({
      next:(lcirc)=>{
        this.circuitos=lcirc??[];
      },
      error:(err)=>{
        this.circuitos=[];
        //por si las moscas, solo añadimes el circuito del paso, si no es nulo
        /*if(this.paso.circuito && this.paso.circuito.id) {
          this.circuitos.push(this.paso.circuito);
        }
        //Lo mismo con el circuito de destino
        if(this.paso.circuitoSiguiente && this.paso.circuitoSiguiente.id!="") {
          this.circuitos.push(this.paso.circuitoSiguiente);
        }*/
        this.msg.mensaje.set({tipo:"error",titulo:"Lista de circuitos",detalle: `No se ha podido obtener la lista de los circuitos, causa: ${err.message}`});
      }
    });
   }

   getOpciones(pestanya:number|string=0) {
    this.opciones=[];
    pestanya=pestanya+"";
    this.opciones.push({
      icon:'pi pi-save',
      tooltip:'Guardar paso',
      command:()=>{

      }
    });

    switch(pestanya) {
      case "1":
      case "2":
          this.opciones.push({separator:true});
          this.opciones.push({
            icon:'pi pi-search-plus',
            tooltip:'Añadir acción',
            command:()=>{
              let tipo=(pestanya=="1"?"PREPASO":"POSTPASO");

            }
          })
          break;
    }
   }

   getEstados() {
    this.crServ.EstadosElementosLista().subscribe({
      next:(est)=>{
        this.estados=est;
      },
      error:(err)=>{
        this.estados=[];
        this.msg.mensaje.set({tipo:"error",titulo:"Estados de elemento",detalle:`No se ha podido obtener el listado de estados de los elementos, causa: ${err.message}`})
      }
    })
   }

   CuandoSeleccionaPestanya(pest:string|number) {
    this.getOpciones(pest);
    if(pest=="1") {
      //Obtenemos la acciones prepaso
      this.getAccionesPaso(true);
    }
    if(pest=="2") {
      //Obtenemos la acciones postpaso
      this.getAccionesPaso(false);
    }
   }


   getAccionesPaso(prepaso:boolean=true) {
      if(prepaso) {
         this.admCirc.AccionesPrepaso(this.paso.id??constantes.guid.zero).subscribe({
          next:(data)=>{
            this.accionesPrepaso=data;
          },
          error:(err)=>{
            this.accionesPrepaso=[];
            this.msg.mensaje.set({tipo:"error",titulo:'Obtener acciones que se ejecutaran antes del paso',detalle:`No se han podido obtener las acciones antes del paso, causa: ${err.message}`});
          }
        });
      } else {
          this.admCirc.AccionesPostpaso(this.paso.id??constantes.guid.zero).subscribe({
            next:(data)=>{
              this.accionesPostpaso=data;
            },
            error:(err)=>{
              this.accionesPostpaso=[];
              this.msg.mensaje.set({tipo:"error",titulo:'Obtener acciones que se ejecutaran después del paso',detalle:`No se han podido obtener las acciones despues del paso, causa: ${err.message}`});
            }
          });
      }
   }

   CuandoSeleccionaPropiedad(prop:PropiedadModel|null) {
    if(prop!=null) {
      this.PropiedadSeleccionada.set(prop);
    } else {
      this.PropiedadSeleccionada.set(null);
    }
   }
}
