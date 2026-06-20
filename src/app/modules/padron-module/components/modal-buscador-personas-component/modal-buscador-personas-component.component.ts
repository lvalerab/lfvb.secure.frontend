import { Component, model, Input } from '@angular/core';
import { PersonaModel } from '@data/interfaces/Censo/PersonaModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-buscador-personas-component',
  standalone: false,
  templateUrl: './modal-buscador-personas-component.component.html',
  styleUrl: './modal-buscador-personas-component.component.less',
  providers:[DialogService]
})
export class ModalBuscadorPersonasComponentComponent {
  @Input()
  Titulo:string="Buscar personas";

  @Input()
  Multiple:boolean=true;

  resultados=model<PersonaModel[]>([]);

  constructor(private dlgRef:DynamicDialogRef) {

  }



  cuandoSeleccionaPersona(persona:PersonaModel) {
    debugger;
    if(this.dlgRef) {
      this.dlgRef.close(persona);
    }
  }

  cuandoSeleccionaPersonas(personas:PersonaModel[]) {
    debugger;
    if(this.dlgRef) {
      this.dlgRef.close(personas);
    }
  }

}
