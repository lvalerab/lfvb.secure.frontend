import { Component,WritableSignal,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CircuitoModel } from '@app/data/interfaces/Circuitos/CircuitoModel';
import { InterseccionModel } from '@app/data/interfaces/Pasos/InterseccionModel';
import { PasoModel } from '@app/data/interfaces/Pasos/PasoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FichaPasoComponent } from '../../pasos/ficha-paso/ficha-paso.component';
import { CoreService } from '@app/data/services/api/CoreService';
import { TipoElementoModel } from '@app/data/interfaces/TipoElementoModel';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { AdministracionGruposPermisosService } from '@app/data/services/api/AdministracionGruposPermisosService';
import { TramiteModel } from '@app/data/interfaces/Circuitos/TramiteModel';

@Component({
  selector: 'app-ficha-circuito-component',
  standalone: false,
  templateUrl: './ficha-circuito-component.component.html',
  styleUrl: './ficha-circuito-component.component.less',
  providers:[DialogService]
})
export class FichaCircuitoComponentComponent {
  private bcir:CircuitoModel={
    id:"",
    nombre:"",
    descripcion:"",
    normativa:"",
    activo:true,
    fechaAlta:new Date(),
    fechaModificacion:new Date(),
    fechaBaja:null,
    tramite:{
      id:"",
      nombre:"",
      descripcion:"",
      normativa:""
    },
    tipos:[],
    grupos:[]
  };

  visorPasos:string="tabla";

  circuito:CircuitoModel=this.bcir;
  pasos:WritableSignal<PasoModel[]>=signal([]);

  tramites:TramiteModel[]=[];
  tipos:TipoElementoModel[]=[];
  grupos:GrupoModel[]=[];

  ListaPropiedades:PropiedadModel[]=[];
  Propiedades:TreeNode[]=[];
  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  opciones:MenuItem[]=[];
  opcionesPasos:MenuItem[]=[];

  constructor(private route:ActivatedRoute,
              private msg:ToastService,
              private admCirc:AdministracionCircuitosTramitacionService,
              private creServ:CoreService,
              private admGrpServ:AdministracionGruposPermisosService,
              private dlgServ:DialogService
  ) {

  }

  ngOnInit() {
      this.route.paramMap.subscribe(params=>{
          var id=params.get("id");          
          if(id!=null) {
            this.getCircuito(id);
          }
        }
      );
      this.getOpciones();
      this.getTramites();
      this.getTipos();
      this.getGrupos();
  }

  getTramites() {
    this.admCirc.ListaTramites().subscribe({
      next:(data)=>{
        this.tramites=data;
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:"error",titulo:'Lista de tramites',detalle:`No se ha podido obtener los tramites, causa: ${err.message}`});
      }
    });
  }

  getTipos() {
    this.creServ.TiposElementosLista().subscribe({
      next:(data)=>{
        this.tipos=data;        
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Listado de tipos de elementos",detalle:`No es posible obtener el listado de tipos, causa: ${err.message}`});
      }
    });
  }

  getGrupos() {
    this.admGrpServ.Lista().subscribe({
      next:(data)=>{
        this.grupos=data;        
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Listado de grupos de usuarios",detalle:`No es posible obtener el listado de grupos de usuarios, causa: ${err.message}`});
      }
    });
  }

  getCircuito(id:string) {
    this.admCirc.GetCircuito(id).subscribe({
      next:(circ)=> {
        this.circuito=circ;
        this.getPasos(this.circuito.id??"");
      },
      error:(err)=>{
        this.circuito=this.bcir;
        this.pasos.set([]);
        this.msg.mensaje.set({tipo:'error',titulo:'Datos del circuito',detalle:`No se ha podido obtener los datos del circuito, causa: ${err.message}`});
      }
    });
  }

  guardarCircuito() {

  }

  getPasos(idCircuito:string) {
    this.admCirc.ListaPasos(idCircuito).subscribe({
      next:(data)=>{
        this.pasos.set(data);
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Obtención de pasos',detalle:`No se han podido obtener los pasos del circuito, causa: ${err.message}`});
      }
    });
  }

  ModalFichaPaso(paso:PasoModel) {
    this.dlgServ.open(FichaPasoComponent, {
          header:"Ficha de paso",
          width:"70%",
          contentStyle:{overflow:'auto'},
          maximizable:true,
          closable:true,
          inputValues:{
            paso:paso
          }
        }).onClose.subscribe(()=>{
          this.getPasos(this.circuito.id??"");
        });
  }

  getOpciones(pestanya:string="general") {
    this.opciones=[];
    this.opciones.push({
      icon:'pi pi-save',
      tooltip:'Guardar datos',
      command:()=>{
        this.guardarCircuito();
      }
    });
    this.opciones.push({
      separator:true
    });
    switch(pestanya) {
      case "pasos":
          this.opciones.push({
          icon:'pi pi-file-plus',
          tooltip:'Alta de nuevo paso',
          command:()=>{
            this.ModalFichaPaso({
                id:null,
                tramite:this.circuito.tramite,
                circuito:this.circuito,
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
              });
          }
        });
        this.opciones.push({
          icon:'pi pi-arrow-right-arrow-left',
          tooltip:'Definir relaciones entre pasos'
        });
        this.opciones.push({
          separator:true
        });
        this.opciones.push({
          icon:'pi pi-table',
          label:this.visorPasos=='tabla'?'*':'',
          tooltip:'Ver tabla de adjacencia',
          command:()=>{
            this.CambiarVistaPasos('tabla');
          }
        }),
        this.opciones.push({
          icon:'pi pi-chart-line',
          label:this.visorPasos=='grafo'?'*':'',
          tooltip:'Ver grafo',
          command:()=>{
            this.CambiarVistaPasos('grafo');
          }
        })
        break;
        default:
          break;
    }
  }


  onCuandoCambiaPestanya(pest:string|number) {
    debugger;
    this.getOpciones((pest==5?'pasos':''));
  }

  CuandoSeleccionaPropiedad(prop:PropiedadModel|null) {
    if(prop!=null) {
      this.PropiedadSeleccionada.set(prop);
    } else {
      this.PropiedadSeleccionada.set(null);
    }
  }


  CambiarVistaPasos(vista:string) {
    this.visorPasos=vista;
  }

  VerPaso(paso:PasoModel) {
    this.ModalFichaPaso(paso);
  }

  RelaccionarDesrelacionarPasos(interseccion:InterseccionModel) {
    debugger;
  }
}
