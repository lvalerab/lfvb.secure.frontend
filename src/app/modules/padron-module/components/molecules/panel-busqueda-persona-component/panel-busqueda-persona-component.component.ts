import { Component,model, Input } from '@angular/core';
import { EntradaBusquedaPersonaModel } from '@app/data/interfaces/Censo/EntradaBusquedaPersonaModel';
import { IdentificacionPersonaModel } from '@app/data/interfaces/Censo/IdentificacionPersonaModel';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { CensoService } from '@app/data/services/api/CensoService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-busqueda-persona-component',
  standalone: false,
  templateUrl: './panel-busqueda-persona-component.component.html',
  styleUrl: './panel-busqueda-persona-component.component.less',
})
export class PanelBusquedaPersonaComponentComponent {
    filtro=model<EntradaBusquedaPersonaModel>({
      id:null,
      nombre:null,
      apellido1:null,
      apellido2:null,
      identificaciones:[]
    });

    personas=model<PersonaModel[]>([]);

    @Input()
    InPanel:boolean=false;

    @Input()
    InPanelTitulo:string="Busqueda de personas";

    @Input()
    PanelOptions:MenuItem[]=[];

    entradaIdentificador:IdentificacionPersonaModel={
      id:null,
      tipo:{
        codigo:null,
        nombre:null
      },
      persona:null,
      dato1:null,
      dato2:null,
      fechaInicioVigencia:null,
      fechaFinVigencia:null
    };

    constructor(private csSer:CensoService,
                private msg:ToastService,
                private route:Router
    ) {

    }

    NgOnInit() {
      this.personas.set([]);
    }

    BuscarPersona() {
      this.csSer.BuscarPersona(this.filtro()).subscribe({
        next:(values)=>{
          this.personas.set(values);
        },
        error:(error)=>{
          this.msg.mensaje.set({tipo:"error",titulo:"Busqueda de personas",detalle:`Ha ocurrido un error al buscar a las personas indicadas, causa: ${error.message}`});
        }
      });
    }

    NuevaPersona() {
      this.route.navigate(['censo/persona']);
    }

    AgregarEntradaIdentificador() {
      var aux=this.filtro();
      if(!aux.identificaciones)
        aux.identificaciones=[];
      aux.identificaciones.push({
        id:null,
        persona:null,
        tipo:{
          codigo:this.entradaIdentificador.tipo?.codigo+"",
          nombre:this.entradaIdentificador.tipo?.nombre+""
        },
        dato1:this.entradaIdentificador.dato1+"",
        dato2:this.entradaIdentificador.dato2+"",
        fechaInicioVigencia:null,
        fechaFinVigencia:null
      });
      this.filtro.set(aux);
      this.entradaIdentificador.tipo=null;
      this.entradaIdentificador.dato1=null;
      this.entradaIdentificador.dato2=null;
    }

    EliminarEntradaIdentificador(iden:IdentificacionPersonaModel) {
      var aux=this.filtro();
      if(aux.identificaciones) {
        var aux2=[];
        for(let i in aux.identificaciones) {
          if(!(aux.identificaciones[i].dato1==iden.dato1 && aux.identificaciones[i].dato2==iden.dato2 && aux.identificaciones[i].tipo?.codigo==iden.tipo?.codigo)) {
            aux2.push(aux.identificaciones[i]);
          }
        }
        aux.identificaciones=aux2;
        this.filtro.set(aux);
      }
    }
}
