import { Component,WritableSignal,signal } from '@angular/core';
import { NucleoModel } from '@app/data/interfaces/Nucleo/NucleoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { CoreService } from '@app/data/services/api/CoreService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-ficha-administracion-core-aplicacion',
  standalone: false,
  templateUrl: './ficha-administracion-core-aplicacion.component.html',
  styleUrl: './ficha-administracion-core-aplicacion.component.less',
})
export class FichaAdministracionCoreAplicacionComponent {
   nucleo:WritableSignal<NucleoModel|null>=signal(null);
   PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

   constructor(private crsr:CoreService,
              private msg:ToastService
   ) {

   }

   ngOnInit() {
    this.crsr.IdentificadorNucleo().subscribe({
      next:(value)=>{
        this.nucleo.set(value);
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Identificador del sistema',detalle:`No se ha podido obtener el identificador del sistema, causa ${error.message}`});
      }
    });
   }


   CuandoSeleccionaPropiedad(prop:PropiedadModel|null) {
    this.PropiedadSeleccionada.set(prop);
   }
}
