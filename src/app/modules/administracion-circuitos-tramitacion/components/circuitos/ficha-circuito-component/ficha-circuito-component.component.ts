import { Component,WritableSignal,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CircuitoModel } from '@app/data/interfaces/Circuitos/CircuitoModel';
import { PasoModel } from '@app/data/interfaces/Pasos/PasoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { tree } from 'd3';
import { MenuItem, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-ficha-circuito-component',
  standalone: false,
  templateUrl: './ficha-circuito-component.component.html',
  styleUrl: './ficha-circuito-component.component.less',
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
    }
  };

  visorPasos:string="tabla";

  circuito:CircuitoModel=this.bcir;
  pasos:WritableSignal<PasoModel[]>=signal([]);

  ListaPropiedades:PropiedadModel[]=[];
  Propiedades:TreeNode[]=[];
  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);
  opcionesPasos:MenuItem[]=[];

  constructor(private route:ActivatedRoute,
              private msg:ToastService,
              private admCirc:AdministracionCircuitosTramitacionService
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
      this.getOpcionesPasos();
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

  getOpcionesPasos() {
    this.opcionesPasos=[];
    this.opcionesPasos.push({
      icon:'pi pi-file-plus',
      tooltip:'Alta de nuevo paso'
    });
    this.opcionesPasos.push({
      icon:'pi pi-arrow-right-arrow-left',
      tooltip:'Definir relaciones entre pasos'
    });
    this.opcionesPasos.push({
      separator:true
    });
    this.opcionesPasos.push({
      icon:'pi pi-table',
      label:this.visorPasos=='tabla'?'*':'',
      tooltip:'Ver tabla de adjacencia',
      command:()=>{
        this.CambiarVistaPasos('tabla');
      }
    }),
    this.opcionesPasos.push({
      icon:'pi pi-chart-line',
      label:this.visorPasos=='grafo'?'*':'',
      tooltip:'Ver grafo',
      command:()=>{
        this.CambiarVistaPasos('grafo');
      }
    })
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
}
