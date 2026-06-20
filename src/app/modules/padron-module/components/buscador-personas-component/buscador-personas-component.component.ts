import { Component, model, Input, Output, output } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-buscador-personas-component',
  standalone: false,
  templateUrl: './buscador-personas-component.component.html',
  styleUrl: './buscador-personas-component.component.less'
})
export class BuscadorPersonasComponentComponent {
  
  @Input()
  Titulo:string="Buscar personas";

  @Input()
  Seleccionar:boolean=false;

  @Input()
  Multiple:boolean=true;

  @Input()
  VerFicha:boolean=true;

  @Input()
  VerNuevo:boolean=true;

  @Input()
  Modal:boolean=false;

  @Input()
  OpcionesMenu:MenuItem[]=[];



  onSelectPersona=output<PersonaModel>();

  onSelectPersonas=output<PersonaModel[]>();

  resultado=model<PersonaModel[]>([]);

  opciones:MenuItem[]=[];



  constructor(private route:Router
  ) {
    
  }

  ngOnInit() {
    this.ConfiguraMenu();
  }

  ConfiguraMenu() {
    let aux:MenuItem[]=[];
    if(this.Multiple) {
      aux.push({
        icon:'pi pi-objects-column',
        title:'Devolver elementos seleccionados',
        tooltip:'Devolver elementos seleccionados',
        command:()=>{
          this.DevolverSeleccionados();
        }
      })
    };
    if(this.OpcionesMenu.length>0) {
      aux.push({
        separator:true
      });
    }
    this.OpcionesMenu.forEach(opt=>{
      aux.push(opt);
    });
    this.opciones=aux;
  }


  SeleccionaPersona(persona:PersonaModel) {
    debugger;
    this.resultado.set([persona]);
    this.onSelectPersona.emit(persona);
  }

  VerFichaPersona(persona:PersonaModel) {
    this.route.navigate(['censo/persona',persona.id]);
  }

  DevolverSeleccionados() {
    let aux:PersonaModel[];
    aux=this.resultado().filter(p=>p.seleccionado==true);
    this.onSelectPersonas.emit(aux);
  }
}
