import { Component, OnDestroy, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { LoginModel} from '@data/interfaces/LoginModel';
import { UsuarioApiService } from '@app/data/services/api/UsuarioApiService';
import { TokenModel } from '@app/data/interfaces/TokenModel';
import {AuthService} from '@shared/services/AuthService';

@Component({
  selector: 'app-modal-login-component',
  standalone: false,
  templateUrl: './modal-login-component.component.html',
  styleUrl: './modal-login-component.component.less',
  providers:[DialogService,MessageService]
})
export class ModalLoginComponentComponent implements OnDestroy {
  
  @Output()
  login:LoginModel;
  ValidarComoMaquina:boolean;
  token:string;



  constructor(private usuarioApi:UsuarioApiService, private dlg:DialogService, private ref:DynamicDialogRef, private MsgService:MessageService, private authServ:AuthService ) {
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
          this.MsgService.add({
              severity:'error',
              summary:'Usuario no válido',
              detail:'El usuario indicado no existe'
            });
            this.authServ.logout();
          break;
        case "400":
          this.MsgService.add({
            severity:'error',
            summary:'Error al validar el usuario',
            detail:'No se ha podido validar el usuario, intentelo pasado unos minutos'
          });
          this.authServ.logout();
          break;
        default:
          this.MsgService.add({
            severity:'error',
            summary:'Error al validar el usuario',
            detail:'No se ha podido validar el usuario, intentelo pasado unos minutos'
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
