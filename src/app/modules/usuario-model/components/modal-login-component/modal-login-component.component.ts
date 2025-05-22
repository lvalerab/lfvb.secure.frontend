import { Component, OnDestroy, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { LoginModel} from '@data/interfaces/LoginModel';
import { UsuarioApiService } from '@app/data/services/api/UsuarioApiService';
import { TokenModel } from '@app/data/interfaces/TokenModel';
import {AuthService} from '@shared/services/AuthService';
import { ToastService } from '@app/shared/services/ToastService';

@Component({
  selector: 'app-modal-login-component',
  standalone: false,
  templateUrl: './modal-login-component.component.html',
  styleUrl: './modal-login-component.component.less',
  providers:[DialogService]
})
export class ModalLoginComponentComponent implements OnDestroy {
  
  @Output()
  login:LoginModel;
  ValidarComoMaquina:boolean;
  token:string;



  constructor(private usuarioApi:UsuarioApiService, private dlg:DialogService, private ref:DynamicDialogRef, private msg:ToastService, private authServ:AuthService ) {
    this.login={usuario:"",password:""};
    this.ValidarComoMaquina=false;
    this.token="";
  }

  ngOnInit():void {

  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.close();
    }
  }

  ValidarUsuario(): void {
    this.usuarioApi.Login(this.login).then((tokenModel:TokenModel)=>{
      this.authServ.login(tokenModel.token);  
      this.ref.close(tokenModel);
    }).catch((error:any)=>{
      switch(error.status) {
        case "401":
          this.msg.mensaje.set({
              tipo:'error',
              titulo:'Usuario no válido',
              detalle:'El usuario indicado no existe'
            });
            this.authServ.logout();
          break;
        case "400":
          this.msg.mensaje.set({
            tipo:'error',
            titulo:'Error al validar el usuario',
            detalle:'No se ha podido validar el usuario, intentelo pasado unos minutos'
          });
          this.authServ.logout();
          break;
        default:
          this.msg.mensaje.set({
            tipo:'error',
            titulo:'Error al validar el usuario',
            detalle:'No se ha podido validar el usuario, intentelo pasado unos minutos'
          });
          this.authServ.logout();
          break;
      }

      this.ref.close(this.login);
    });
  }

  CerrarModal(): void {
    this.ref.close(null);
  }

}
