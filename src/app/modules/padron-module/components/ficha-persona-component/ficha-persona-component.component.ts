import { Component, model } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-ficha-persona-component',
  standalone: false,
  templateUrl: './ficha-persona-component.component.html',
  styleUrl: './ficha-persona-component.component.less',
})
export class FichaPersonaComponentComponent {

  
  persona=model<PersonaModel>({
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
  });

  verPanel={
    lineaTemporal:false,
  }

  botones:MenuItem[]=[];

  constructor(private csServ:CensoService,
              private msg:ToastService,
              private ruta:ActivatedRoute,
              private conf:ConfirmationService
  ) {

  }

  ngOnInit() {
    this.ruta.paramMap.subscribe((prm)=>{
      if(prm.get("id")) {
        let id=prm.get("id");
        this.GetPersona(id);
        this.ConfigurarBarraHerramientas();
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
      this.persona.set({
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
      });
      this.ConfigurarBarraHerramientas();
    }
  }

  ConfigurarBarraHerramientas() {
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
}
