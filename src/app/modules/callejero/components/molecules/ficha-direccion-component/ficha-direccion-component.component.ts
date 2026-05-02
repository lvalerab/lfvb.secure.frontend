import { Component,model, Input } from '@angular/core';
import { DireccionModel } from '@app/data/interfaces/Callejero/DireccionModel';

@Component({
  selector: 'app-ficha-direccion-component',
  standalone: false,
  templateUrl: './ficha-direccion-component.component.html',
  styleUrl: './ficha-direccion-component.component.less',
})
export class FichaDireccionComponentComponent {   
  direccion=model<DireccionModel|null>(null);

  @Input()
  SoloLectura:boolean=false;

  constructor() {

  }

  ngOnInit() {
    
  }
}
