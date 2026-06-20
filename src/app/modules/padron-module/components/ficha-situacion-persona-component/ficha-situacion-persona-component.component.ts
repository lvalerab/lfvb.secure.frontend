import { Component, model, Input } from '@angular/core';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { SituacionPersonaModel } from '@app/data/interfaces/Censo/SituacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { noop } from 'rxjs';

@Component({
  selector: 'app-ficha-situacion-persona-component',
  standalone: false,
  templateUrl: './ficha-situacion-persona-component.component.html',
  styleUrl: './ficha-situacion-persona-component.component.less',
  providers:[DialogService]
})
export class FichaSituacionPersonaComponentComponent {

  situacionNueva:SituacionPersonaModel={
    id:null,
    tipo:null,
    persona:null,
    observaciones:null,
    fechaInicio:null,
    fechaFin:null,
  }

  situacion=model<SituacionPersonaModel>({...this.situacionNueva});

  @Input()
  persona:PersonaModel|null|undefined;

  opciones:MenuItem[]=[];

  constructor( 
        private csServ:CensoService,
        private msg:ToastService,        
        private dlgRef:DynamicDialogRef) {

  }

  ngOnInit() {
    if(!this.situacion()) {
      this.situacion.set({...this.situacionNueva});
    }
    this.ConfiguraBarraMenus();
  }


   ConfiguraBarraMenus() {
      let aux:MenuItem[]=[];
      aux.push({
        icon:'pi pi-save',
        tooltip:'Guardar identificacion',
        command:()=>{
          this.Guardar();
        }
      });
      this.opciones=aux;
    }

    Guardar() {
      let aux=this.situacion();
      if(aux) {
        if(this.persona) {
          if(!aux.persona) {
            aux.persona={id:null, nombre:null,apellido1:null,apellido2:null,relaciones:[],situaciones:[],sexo:null,fechaNacimiento:null,tipo:null,identificaciones:[],seleccionado:false};
          }
          aux.persona.id=this.persona.id;
        } 
        if(aux.id) {
          this.csServ.ModificaSituacionPersona(aux).subscribe({
            next:(value)=>{
              this.situacion.set(value);
              if(this.dlgRef) {
                this.dlgRef.close();
              }
            },
            error:(error)=>{
              this.msg.mensaje.set({tipo:"error",titulo:"Guardar situación",detalle:`No se ha podido guardar la situación de la persona, causa: ${error.message}`});
            }
          })
        } else {
          this.csServ.AltaSituacionPersona(aux).subscribe({
            next:(value)=>{
              this.situacion.set(value);
              if(this.dlgRef) {
                this.dlgRef.close();
              }
            },
            error:(error)=>{
              this.msg.mensaje.set({tipo:"error",titulo:"Guardar situación",detalle:`No se ha podido guardar la situación de la persona, causa: ${error.message}`});
            }
          })
        } 
      }
    }  
}
