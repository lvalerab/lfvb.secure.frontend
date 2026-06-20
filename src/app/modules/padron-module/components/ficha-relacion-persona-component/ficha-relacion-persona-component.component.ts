import { Component, model, Input } from '@angular/core';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { RelacionPersonaModel } from '@app/data/interfaces/Censo/RelacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalBuscadorPersonasComponentComponent } from '../modal-buscador-personas-component/modal-buscador-personas-component.component';
import { CmdRelacionPersonaModel } from '@data/interfaces/Censo/CmdRelacionPersonaModel';

@Component({
  selector: 'app-ficha-relacion-persona-component',
  standalone: false,
  templateUrl: './ficha-relacion-persona-component.component.html',
  styleUrl: './ficha-relacion-persona-component.component.less',
  providers:[DialogService]
})
export class FichaRelacionPersonaComponentComponent {
  relacionNueva:RelacionPersonaModel={
    id:null,
    fechaFinVigencia:null,
    fechaInicioVigencia:null,
    observaciones:null,
    persona1:null,
    persona2:null,
    tipo: {
      codigo:null,
      nombre:null
    }
  }

  relacion=model<RelacionPersonaModel>({...this.relacionNueva});

  @Input()
  persona1:PersonaModel|null=null;

  @Input()
  persona2:PersonaModel|null=null;

  botonesHerramientas:MenuItem[]=[];

  constructor(
    private csServ:CensoService,
    private msg:ToastService,
    private dlgRef:DynamicDialogRef,
    private dlg:DialogService
  ) {

  }

  ngOnInit() {
    debugger;
    let aux=this.relacion();    
    if(!this.relacion()) {
      this.relacion.set({...this.relacionNueva})
      aux=this.relacion();
    }
    if(!this.relacion().persona1 && this.persona1) {      
      aux.persona1={
        id:this.persona1.id,
        nombre:this.persona1.nombre,
        apellido1:this.persona1.apellido1,
        apellido2:this.persona1.apellido2,
        tipo:this.persona1.tipo,
        fechaNacimiento: null,
        identificaciones:[],
        relaciones:[],
        seleccionado:false,
        sexo:this.persona1.sexo,
        situaciones:[]
      };
    }
    if(!this.relacion().persona2 && this.persona2) {      
      aux.persona1={
        id:this.persona2.id,
        nombre:this.persona2.nombre,
        apellido1:this.persona2.apellido1,
        apellido2:this.persona2.apellido2,
        tipo:this.persona2.tipo,
        fechaNacimiento: null,
        identificaciones:[],
        relaciones:[],
        seleccionado:false,
        sexo:this.persona2.sexo,
        situaciones:[]
      };
    }
    this.relacion.set(aux);
    this.ConfigurarMenu();
  }

  ngAfterContentInit() {
    this.ConfigurarMenu();
  }

  ConfigurarMenu() {
    let aux:MenuItem[]=[];

    aux.push({
      icon:'pi pi-save',
      tooltip:'Guardar relación',
      command:()=>{
        this.Guardar();
      }
    })

    if(!this.relacion().persona2) {
      aux.push({
        icon:'pi pi-search',
        tooltip:'Buscar persona',
        command:()=>{
          this.ModalBuscarPersonas();
        }
      })
    }

    this.botonesHerramientas=aux;
  }


  ModalBuscarPersonas() {    
    let prm={
      header:'Relación interpersonal',
      width:'75vw',
      modal:true,
      closable: true,
      inputValues:{
        Multiple:false
      }
    };
    this.dlg.open(ModalBuscadorPersonasComponentComponent, prm)
      .onClose.subscribe((persona:PersonaModel)=>{
          debugger;
          let aux=this.relacion();
          aux.persona2=persona;
          this.relacion.set(aux);
        });
  }



  Guardar() {
    let aux:CmdRelacionPersonaModel={
      idPersona1:this.relacion().persona1?.id,
      idPersona2:this.relacion().persona2?.id,
      tipo:this.relacion().tipo,
      fechaInicio:this.relacion().fechaInicioVigencia,
      fechaFin:this.relacion().fechaFinVigencia,
      observaciones:this.relacion().observaciones
    };
    this.csServ.AltaModificacionRelacionPersona(aux).subscribe({
      next:(value)=>{
        this.dlgRef.close(value);
        this.dlgRef.destroy();
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Guardar relación',detalle:`No se ha podido guardar la relación actual, causa: ${error.message}`});
      }
    })
  }

}
