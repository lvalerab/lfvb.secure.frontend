import { Component, OnDestroy } from '@angular/core';
import { AltaUsuarioModel } from '@app/data/interfaces/AltaUsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { ToastService } from '@app/shared/services/ToastService';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-alta-nuevo-usuario',
  standalone: false,
  templateUrl: './modal-alta-nuevo-usuario.component.html',
  styleUrl: './modal-alta-nuevo-usuario.component.less'
})
export class ModalAltaNuevoUsuarioComponent implements OnDestroy {

  usuario:AltaUsuarioModel={
    idNuevo:"00000000-0000-0000-0000-000000000000",
    nombre:"",
    apellido1:"",
    apellido2:"",
    usuario:"",
    email:"",
    password:"",
    token:""
  };

  constructor(private ref:DynamicDialogRef,
              private admUsrServ:AdministracionUsuariosService,
              private msg:ToastService
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
    this.admUsrServ.AltaUsuario(this.usuario).subscribe({
      next:(usuario)=>{
        this.msg.mensaje.set({tipo:'success',titulo:'Alta usuario',detalle:'Usuario creado con éxito'});
        this.CerrarModal();
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Alta usuario',detalle:`No se ha podido crear el usuario actual, causa: {{error.message}}`});
      }
    })
  }

  CerrarModal() {
    if(this.ref) {
      this.ref.close();
    }
  }
}
