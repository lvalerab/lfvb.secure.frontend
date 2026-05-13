import { Component, model, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaModel } from '@app/data/interfaces/Censo/PersonaModel';

@Component({
  selector: 'app-buscador-personas-component',
  standalone: false,
  templateUrl: './buscador-personas-component.component.html',
  styleUrl: './buscador-personas-component.component.less',
})
export class BuscadorPersonasComponentComponent {
  
  @Input()
  Titulo:string="Buscar personas";

  @Input()
  Multiple:boolean=true;

  resultado=model<PersonaModel[]>([]);

  constructor(private route:Router) {

  }


  SeleccionaPersona(persona:PersonaModel) {
    this.resultado.set([persona]);
  }

  VerFichaPersona(persona:PersonaModel) {
    this.route.navigate(['censo/persona',persona.id]);
  }
}
