import { Component, OnDestroy } from '@angular/core';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-alta-nuevo-usuario',
  standalone: false,
  templateUrl: './modal-alta-nuevo-usuario.component.html',
  styleUrl: './modal-alta-nuevo-usuario.component.less'
})
export class ModalAltaNuevoUsuarioComponent implements OnDestroy {
  
  usuario:UsuarioModel={
    id:undefined,
    loggeado:false,
    token:undefined,
    usuario:"",
    nombre:"",
    apellido1:"",
    apellido2:"",
    credenciales:[],
    grupos:[]
  };

  constructor(private ref:DynamicDialogRef
  ) {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }

  CrearUsuario() {

  }

  CerrarModal() {
    if(this.ref) {
      this.ref.close();
    }
  }
}
