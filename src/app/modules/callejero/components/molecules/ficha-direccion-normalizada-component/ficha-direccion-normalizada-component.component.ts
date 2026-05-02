import { Component,model, Input } from '@angular/core';
import { CallejeroModel } from '@app/data/interfaces/Callejero/CallejeroModel';
import { DireccionModel } from '@app/data/interfaces/Callejero/DireccionModel';
import { DireccionNormalizadaModel } from '@data/interfaces/Callejero/DireccionNormalizadaModel';

@Component({
  selector: 'app-ficha-direccion-normalizada-component',
  standalone: false,
  templateUrl: './ficha-direccion-normalizada-component.component.html',
  styleUrl: './ficha-direccion-normalizada-component.component.less',
})
export class FichaDireccionNormalizadaComponentComponent {
  direccion=model<DireccionModel|null>(null);

  @Input()
  SoloLectura:boolean=false;

  constructor() {

  }

  ngOnInit() {

  }

  OnCuandoCambiaVia(via:CallejeroModel|null|undefined) {
    if(this.direccion()) {
      if(this.direccion()?.normalizada) {
        //this.direccion().normalizada.calle=via;
      }
    }
  }


}
