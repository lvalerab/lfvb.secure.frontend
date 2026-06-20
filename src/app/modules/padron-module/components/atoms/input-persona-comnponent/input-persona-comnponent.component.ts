import { Component, model, Input, computed } from '@angular/core';
import { IdentificacionPersonaModel } from '@app/data/interfaces/Censo/IdentificacionPersonaModel';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { TipoIdentificacionPersonaModel } from '@app/data/interfaces/Censo/TipoIdentificacionPersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { constantes } from 'src/const/constantes';

@Component({
  selector: 'app-input-persona-comnponent',
  standalone: false,
  templateUrl: './input-persona-comnponent.component.html',
  styleUrl: './input-persona-comnponent.component.less',
})
export class InputPersonaComnponentComponent {
  personaNueva:PersonaModel={
    id:null,
    tipo:null,
    nombre:null,
    apellido1:null,
    apellido2:null,
    fechaNacimiento:null,
    identificaciones:[],
    relaciones:[],
    sexo:null,
    seleccionado:false,
    situaciones:[]
  }

  persona=model<PersonaModel|null|undefined>({...this.personaNueva});

  @Input()
  Detallado:boolean=false;

  @Input()
  MostrarRelaciones:boolean=false;

  @Input()
  MostrarIdentificacion:boolean=false;

  @Input()
  TipoIdentificacionDefecto:TipoIdentificacionPersonaModel={
    codigo:"NIF",
    nombre:"NIF/DNI"
  };

  @Input()
  MostrarSeleccionado:boolean=false;

  @Input()
  MostrarBtnBuscar:boolean=true;

  @Input()
  MostrarBtnNuevo:boolean=false;

  @Input()
  ConsultarDetallePersona:boolean=true;

  identificacion:IdentificacionPersonaModel|null=null;

  BotonesMenu:MenuItem[]=[];
  
  constructor(
    private csServ:CensoService,
    private msg:ToastService
  ) {
    computed(() => {
      let aux=(this.persona()?.identificaciones??[]).filter(i=>i.tipo?.codigo==this.TipoIdentificacionDefecto.codigo);
      if(aux.length>0) {
        this.identificacion=aux[0];
      } else {
        this.identificacion={
          id:null,
          persona:null,
          dato1:"",
          dato2:"",
          tipo:this.TipoIdentificacionDefecto,
          fechaFinVigencia:null,
          fechaInicioVigencia:null
        };
      }
    })
  }
  
  ngOnInit() {    
    if(this.ConsultarDetallePersona && this.persona()?.id) {
      this.csServ.GetPersona(this.persona()?.id??constantes.guid.zero).subscribe({
        next:(value)=>{
          this.persona.set(value);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Detalle de la persona',detalle:`No es posible obtener el detalle de la persona, causa: ${error.message}`});
        }
      });
    }
    this.ConfigurarMenus();    
  }

  ConfigurarMenus() {
    let aux:MenuItem[]=[];
    if(this.MostrarBtnBuscar) {
      aux.push({
        icon:'pi pi-search',
        command:()=>{}
      })
    }
    if(this.MostrarBtnNuevo) {
      aux.push({
        icon:'pi pi-add',
        command:()=>{}
      })
    }
  }

}
