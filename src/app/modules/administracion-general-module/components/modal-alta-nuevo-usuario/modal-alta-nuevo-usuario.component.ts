import { Component, OnDestroy } from '@angular/core';
import { AltaUsuarioModel } from '@app/data/interfaces/AltaUsuarioModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-alta-nuevo-usuario',
  standalone: false,
  templateUrl: './modal-alta-nuevo-usuario.component.html',
  styleUrl: './modal-alta-nuevo-usuario.component.less'
})
export class ModalAltaNuevoUsuarioComponent implements OnDestroy {

  usuario:AltaUsuarioModel={
    idNuevo:"",
    nombre:"",
    apellido1:"",
    apellido2:"",
    usuario:"",
    password:"",
    token:""
  };

  constructor(private ref:DynamicDialogRef,
              private admUsrServ:AdministracionUsuariosService
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
