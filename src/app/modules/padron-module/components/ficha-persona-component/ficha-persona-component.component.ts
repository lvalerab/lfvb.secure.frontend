import { Component, model, WritableSignal ,signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentificacionPersonaModel } from '@app/data/interfaces/Censo/IdentificacionPersonaModel';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { FichaIdentificacionPersonaComponentComponent } from '../ficha-identificacion-persona-component/ficha-identificacion-persona-component.component';
import { constantes } from 'src/const/constantes';
import { SituacionPersonaModel } from '@app/data/interfaces/Censo/SituacionPersonaModel';
import { FichaSituacionPersonaComponentComponent } from '../ficha-situacion-persona-component/ficha-situacion-persona-component.component';
import { RelacionPersonaModel } from '@app/data/interfaces/Censo/RelacionPersonaModel';
import { FichaRelacionPersonaComponentComponent } from '../ficha-relacion-persona-component/ficha-relacion-persona-component.component';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';

@Component({
  selector: 'app-ficha-persona-component',
  standalone: false,
  templateUrl: './ficha-persona-component.component.html',
  styleUrl: './ficha-persona-component.component.less',
  providers:[DialogService]
})
export class FichaPersonaComponentComponent {

  personaNueva={
    id:null,
    nombre:null,
    apellido1:null,
    apellido2:null,
    fechaNacimiento:null,
    identificaciones:[],
    relaciones:[],
    sexo:null,
    seleccionado:false,
    situaciones:[],
    tipo:null
  };
  
  persona=model<PersonaModel>({...this.personaNueva});

  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  verPanel={
    lineaTemporal:false,
  }

  varPestanya={
    pestanya:'0'
  };

  botones:MenuItem[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService,
              private ruta:ActivatedRoute,
              private conf:ConfirmationService,
              private dlg:DialogService
  ) {

  }

  ngOnInit() {
    this.ruta.paramMap.subscribe((prm)=>{
      if(prm.get("id")) {
        let id=prm.get("id");
        this.GetPersona(id);
        this.ConfigurarBarraHerramientas(0);
      } else {
        this.GetPersona(null);
      }
    });    
  }

  GetPersona(id:string|undefined|null) {
    if(id) {
      this.csServ.GetPersona(id).subscribe({
        next:(data)=>{
          this.persona.set(data);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Datos de la persona",detalle:`No se ha podido obtener los datos de la persona, causa: ${error.message}`});
        }
      });
    } else {
      this.persona.set({...this.personaNueva});
      this.ConfigurarBarraHerramientas(0);
    }
  }

  ConfigurarBarraHerramientas(pestanya:string|number) {
    let aux:MenuItem[]=[];
    //Los generales, guardar, etcc
    aux.push({
      icon:'pi pi-save',
      tooltip:'Guardar datos',
      command:()=>{     
        this.Guardar();
      }
    });
    aux.push({
      separator:true
    });
    switch(parseInt(pestanya+'',10)) {
        case 0:  
          //Identificadores
          aux.push({
            icon:'pi pi-id-card',
            tooltip:'Nueva identificación',
            command:()=>{
              this.ShowModalIdentificador(null);
            }
          });      
          break;
        case 1:
          //Situaciones
          aux.push({
            icon:'pi pi-comments',
            tooltip:'Nueva situación',
            command:()=>{
              this.ShowModalSituacion(null);
            }
          });
          break
        case 2:
          //Relaciones
          aux.push({
            icon:'pi pi-users',
            tooltip:'Nueva relación interpersonal',
            command:()=>{
              this.ShowModalRelacion(null);
            }
          });
          break
        case 3:
          //Direcciones
          aux.push({
            icon:'pi pi-address-book',
            tooltip:'Nueva dirección',
            command:()=>{}
          });
          break
        case 4:
          //Elementos
          aux.push({
            icon:'pi pi-objects-column',
            tooltip:'Relacionar elemento existente',
            command:()=>{}
          });
          break
        case 5:
        
          break;
    }

    aux.push({
      separator:true
    });
    aux.push({
      icon:'pi pi-history',
      command:()=>{this.verPanel.lineaTemporal=!this.verPanel.lineaTemporal;}
    })
    if(this.persona().id) {

    }

    this.botones=aux;
  }

  Guardar() {
    let aux:PersonaModel=this.persona();
    aux.relaciones=[];
    aux.identificaciones=[];
    aux.situaciones=[];
    if(aux.id) {      
      this.csServ.ModificaPersona(aux).subscribe({
        next:(datos)=>{
          this.persona.set(datos);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Guardar persona',detalle:`No se ha podido guardar la persona, causa: ${error.message}`});
        }
      });
    } else {
      this.csServ.AltaPersona(aux).subscribe({
        next:(datos)=>{
          this.persona.set(datos);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Guardar persona',detalle:`No se ha podido guardar la persona, causa: ${error.message}`});
        }
      });
    }
  }


  OnCambiaPestanya(pestanya:string|number) {
    this.ConfigurarBarraHerramientas(pestanya);
  }


  EditarIdentificacion(ident:IdentificacionPersonaModel) {
    this.ShowModalIdentificador(ident);
  }


  ShowModalIdentificador(ident:IdentificacionPersonaModel|null) {
    let prm={
      header:'Identificador de la persona',
      width:'75vw',
      modal:true,
      closable: true,
      inputValues:{
        identificacion:ident,
        persona:{...this.persona()}
      }
    };
    this.dlg.open(FichaIdentificacionPersonaComponentComponent,prm).onClose.subscribe(()=>{
      this.csServ.GetIdentificadoresPersona(this.persona().id??constantes.guid.zero).subscribe({
        next:(valores)=>{
          let aux=this.persona();
          aux.identificaciones=valores;
          this.persona.set(aux);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de identificadores',detalle:`No se ha podido obtener los identificadores de la persona`});
        }
      });
    });
  }


  ShowModalSituacion(situacion:SituacionPersonaModel|null) {
    let prm={
      header:'Situación de la persona',
      width:'75vw',
      modal:true,
      closable: true,
      inputValues:{
        situacion:situacion,
        persona:{...this.persona()}
      }
    };

    this.dlg.open(FichaSituacionPersonaComponentComponent,prm).onClose.subscribe(()=>{
      this.csServ.GetSituacionesPersona(this.persona().id??constantes.guid.zero).subscribe({
        next:(valores)=>{
          let aux=this.persona();
          aux.situaciones=valores;
          this.persona.set(aux);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de situaciones',detalle:`No se ha podido obtener las situaciones de la persona`});
        }
      });
    });
  }

  ShowModalRelacion(relacion:RelacionPersonaModel|null) {
    let prm={
      header:'Relación interpersonal',
      width:'75vw',
      modal:true,
      closable: true,
      inputValues:{
        relacion:relacion,
        persona1:{...this.persona()}
      }
    };

    this.dlg.open(FichaRelacionPersonaComponentComponent,prm).onClose.subscribe(()=>{
      this.csServ.GetRelacionesPersona(this.persona().id??constantes.guid.zero).subscribe({
        next:(valores)=>{
          let aux=this.persona();
          aux.relaciones=valores;
          this.persona.set(aux);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Lista de relaciones',detalle:`No se ha podido obtener las relaciones de la persona`});
        }
      });
    });
  }


  CuandoSeleccionaPropiedad(propiedad:PropiedadModel|null) {
    this.PropiedadSeleccionada.set(propiedad);
  }
}
