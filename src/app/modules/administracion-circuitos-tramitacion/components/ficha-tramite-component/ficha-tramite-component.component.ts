import { Component,WritableSignal,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { TramiteModel } from '@data/interfaces/Circuitos/TramiteModel';
import { MenuItem } from 'primeng/api';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-ficha-tramite-component',
  standalone: false,
  templateUrl: './ficha-tramite-component.component.html',
  styleUrl: './ficha-tramite-component.component.less'
})
export class FichaTramiteComponentComponent {
    tramite:TramiteModel={
      id:"",
      nombre:"",
      descripcion:"",
      normativa:""
    };

    opciones:MenuItem[]=[];

    ListaPropiedades:PropiedadModel[]=[];
    Propiedades:TreeNode[]=[];
    PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

    constructor(private admCircSer:AdministracionCircuitosTramitacionService,
                private route:ActivatedRoute,
                private msg:ToastService
    ) {

    }

    ngOnInit() {
      this.route.paramMap.subscribe(params=>{
          var id=params.get("id");          
          if(id!=null) {
            this.getTramite(id);
          }
        }
      )
    }

    getOpcionesTramite() {
      this.opciones=[];
      this.opciones.push({
        icon:'pi pi-plus',
        label:"Nuevo",
        command:()=>this.NuevoTramite()
      });
      this.opciones.push({
        icon:'pi pi-save',
        label:'Guardar',
        command:()=>this.GuardarTramite()
      });
      if(this.tramite.id!="") {       
        this.opciones.push({
          separator:true
        });
        this.opciones.push({
          icon:'pi pi-database',
          label:'Administrar circuitos'
        });
      }
    }

    getTramite(id:string) {
      this.admCircSer.GetTramite(id).subscribe({
        next:(value=>{
          let aux:TramiteModel=value??{id:"",nombre:"",descripcion:"",normativa:""};
          this.tramite=aux;
          this.getOpcionesTramite();
        }),
        error:(error=>{
          this.msg.mensaje.set({titulo:"Obtención del tramite",detalle:"No es posible obtener el tramite indicado",tipo:"error"});
        })
      })
    }


    CuandoSeleccionaPropiedad(prop:PropiedadModel|null) {
      if(prop!=null) {
        this.PropiedadSeleccionada.set(prop);
      } else {
        this.PropiedadSeleccionada.set(null);
      }
    }

    NuevoTramite() {
      this.tramite={
        id:"",
        nombre:"",
        descripcion:"",
        normativa:""
      };
      this.getOpcionesTramite();
    }

    GuardarTramite() {
      if(this.tramite.nombre!="" && this.tramite.descripcion!="") {
        if(this.tramite.id=="") {
          this.admCircSer.AltaTramite(this.tramite).subscribe({
            next:(value)=>{
              this.getTramite(value?.id??"");
              this.msg.mensaje.set({tipo:"success",titulo:"Guardar datos del tramite",detalle:"Se ha guardardo correctamente"});
            },
            error:(error)=>{
              this.msg.mensaje.set({tipo:"error",titulo:"Al guardar nuevo tramite",detalle:`No se ha podido guardar el trámite, causa ${error.message}`});
            }
          });
        } else {
          this.admCircSer.ModificaTramite(this.tramite).subscribe({
            next:(value)=>{
              this.getTramite(value?.id??"");
              this.msg.mensaje.set({tipo:"success",titulo:"Guardar datos del tramite",detalle:"Se ha guardardo correctamente"});
            },
            error:(error)=>{
              this.msg.mensaje.set({tipo:"error",titulo:"Al guardar nuevo tramite",detalle:`No se ha podido guardar el trámite, causa ${error.message}`});
            }
          });
        }
      } else {
        this.msg.mensaje.set({tipo:"error",titulo:"Al guardar el trámite",detalle:"Faltan datos para guardar dicho tramite"});
      }
    }
}
