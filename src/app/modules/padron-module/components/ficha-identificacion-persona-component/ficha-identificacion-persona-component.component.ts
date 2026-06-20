import { Component, model, Input } from '@angular/core';
import { IdentificacionPersonaModel } from '@app/data/interfaces/Censo/IdentificacionPersonaModel';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { TipoIdentificacionPersonaModel } from '@app/data/interfaces/Censo/TipoIdentificacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ValidadoresService } from '@app/data/services/utils/ValidadoresService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ficha-identificacion-persona-component',
  standalone: false,
  templateUrl: './ficha-identificacion-persona-component.component.html',
  styleUrl: './ficha-identificacion-persona-component.component.less',
  providers:[DialogService]
})
export class FichaIdentificacionPersonaComponentComponent {
    identificacionNueva={
      id:null,
      tipo:null,
      persona:null,
      dato1:null,
      dato2:null,
      fechaInicioVigencia:null,
      fechaFinVigencia:null
    }

    campos={
      dato1:{
        readonly:false,
        validator:''
      },
      dato2:{
        readonly:false,
        validator:''
      }
    }


    identificacion=model<IdentificacionPersonaModel>({...this.identificacionNueva});

    @Input()
    persona:PersonaModel|null|undefined=null;

    opcionesBarraMenu:MenuItem[]=[];


    constructor(
      private csServ:CensoService,
      private msg:ToastService,
      private vld:ValidadoresService,
      private dlgRef:DynamicDialogRef
    ) {

    }

    ngOnInit() {
      if(!this.identificacion()) {
        this.identificacion.set({...this.identificacionNueva});
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
      this.opcionesBarraMenu=aux;
    }


    OnCuandoCambiaTipo(tipo:TipoIdentificacionPersonaModel|undefined|null) {
      switch(tipo?.codigo) {
        case "NIF":
          this.campos.dato1.readonly=false;
          this.campos.dato2.readonly=true;
          this.campos.dato1.validator='DNI';
          break;
        case "NIE":
          this.campos.dato1.readonly=false;
          this.campos.dato2.readonly=true;
          this.campos.dato1.validator='NIE';
          break
        default:
          this.campos.dato1.readonly=false;
          this.campos.dato2.readonly=false;
          this.campos.dato1.validator='OTR';
          break;
      }
    }

   

    OnValidarCampo(dato:string|null,campo:number) {
      let aux=this.identificacion();
      switch(campo) {
        case 1:
            switch(this.campos.dato1.validator) {
              case 'DNI':                  
                  aux.dato2=this.vld.LetraDNI(aux.dato1??"");                  
                break;
              case 'NIE':                  
                  aux.dato2=this.vld.LetraDNI(aux.dato1??"");                  
                break;
            }
          break;
      }
      this.identificacion.set(aux);
    }

    Guardar() {
      let aux:IdentificacionPersonaModel=this.identificacion();
      aux.persona={
        id:this.persona?.id,
        nombre:this.persona?.nombre,
        apellido1:this.persona?.apellido1,
        apellido2:this.persona?.apellido2,
        fechaNacimiento:null,
        identificaciones:[],
        relaciones:[],
        seleccionado:false,
        sexo:null,
        situaciones:[],
        tipo:this.persona?.tipo
      };
      let error:string="";
      if(!aux.dato1) {
        error+="Se debe indicar el 1º dato\n";
      }
      if(!aux.dato2) {
        error+="Se debe indicar el 2º dato\n";
      }
      if(!aux.persona) {
        error+="No se ha indicado la persona";
      }
      if(error=="") {
        this.csServ.AltaModificacionIdentificadorPersona(aux).subscribe({
          next:(value)=> {
            this.identificacion.set(value);
            if(this.dlgRef) {
              this.dlgRef.close();
            }
          },
          error:(error)=>{
            this.msg.mensaje.set({tipo:'error',titulo:'Guardar identificacion',detalle:`No se ha podido guardar la identificacion, causa: ${error.message}`});
          }
        });
      } else {
        this.msg.mensaje.set({tipo:'error',titulo:'Validar campos',detalle:`${error}`});
      }
    }
}
