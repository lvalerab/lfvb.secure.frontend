import { Component, Input, OnDestroy, Output } from '@angular/core';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-buscador-propiedades',
  standalone: false,
  templateUrl: './modal-buscador-propiedades.component.html',
  styleUrl: './modal-buscador-propiedades.component.less'
})
export class ModalBuscadorPropiedadesComponent implements OnDestroy {
   @Input()
   tipoElemento:string|null=null;

   propiedad:PropiedadModel|null=null;

   constructor(private ref:DynamicDialogRef) {

   }

   ngOnInit() {

   }

   ngOnDestroy(): void {
     if(this.ref) {
      this.ref.destroy();
     }
   }

   CuandoSeleccionaPropiedad(valor:PropiedadModel|null) {    
     this.propiedad=valor;
     if(this.ref) {
      this.ref.close(this.propiedad);
     }
   }
}
