import { Component,model, Input } from '@angular/core';
import { IdentificacionPersonaModel } from '@app/data/interfaces/Censo/IdentificacionPersonaModel';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { TipoIdentificacionPersonaModel } from '@app/data/interfaces/Censo/TipoIdentificacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-identificador-persona-component',
  standalone: false,
  templateUrl: './panel-identificador-persona-component.component.html',
  styleUrl: './panel-identificador-persona-component.component.less',
})
export class PanelIdentificadorPersonaComponentComponent {

  identificador=model<IdentificacionPersonaModel|null|undefined>(undefined);

  @Input()
  persona:PersonaModel|null|undefined;

  @Input()
  SoloLectura:boolean=false;

  @Input()
  ShowHeader:boolean=false;

  @Input()
  ShowTitulo:boolean=false;

  @Input()
  Titulo:string="Ficha identificacion persona";

  @Input()
  ShowOpciones:boolean=false;

  @Input()
  OtrasOpciones:MenuItem[]=[];


  opciones:MenuItem[]=[];

  aux:IdentificacionPersonaModel|null|undefined;

  constructor(private csServ:CensoService,
              private msg:ToastService
  ) {

  }

  NgOnInit() {
    if(this.identificador()==null || this.identificador()==undefined) {
      this.aux={
        id:null,
        tipo:null,
        persona:this.persona,
        dato1:null,
        dato2:null,
        fechaInicioVigencia:null,
        fechaFinVigencia:null
      };
      this.identificador.set(this.aux);
    }
    this.PreparaMenuHerramientas();
  }

  PreparaMenuHerramientas() {
    let aux:MenuItem[]=[];

    aux.push({
      label:'Guardar',
      icon:'pi pi-save',
      command:()=>this.GuardarDatos()
    });

    if(this.OtrasOpciones.length>0) {
      aux.push({
        separator:true
      });
      for(let i=0;i<this.OtrasOpciones.length;i++) {
        aux.push(this.OtrasOpciones[i]);
      } 
    }
    this.opciones=aux;
  }

  OnCuandoCambiaTipo(value:TipoIdentificacionPersonaModel|null|undefined) {
    this.aux=this.identificador();
    if(this.aux) {
      this.aux.tipo=value;
      this.identificador.set(this.aux);      
    }
  }

  dato1Change(dato:string|undefined|null) {
    this.aux=this.identificador();
    if(this.aux) {
      this.aux.dato1=dato;
      this.identificador.set(this.aux);      
    }
  }

  dato2Change(dato:string|undefined|null) {
    this.aux=this.identificador();
    if(this.aux) {
      this.aux.dato2=dato;
      this.identificador.set(this.aux);      
    }
  }


  GuardarDatos() {

  }
}
