import { Component,model, Input } from '@angular/core';
import { DireccionModel } from '@app/data/interfaces/Callejero/DireccionModel';

@Component({
  selector: 'app-ficha-direccion-no-normalizada-component',
  standalone: false,
  templateUrl: './ficha-direccion-no-normalizada-component.component.html',
  styleUrl: './ficha-direccion-no-normalizada-component.component.less',
})
export class FichaDireccionNoNormalizadaComponentComponent {

  direccion=model<DireccionModel|null>(null);

  @Input()
  SoloLectura:boolean=false;

  constructor() {

  }

  NgOnInit() {
    
  }
}
