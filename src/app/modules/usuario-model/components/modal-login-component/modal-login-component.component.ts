import { Component, OnDestroy, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginModel} from '@data/interfaces/LoginModel';
import { UsuarioApiService } from '@app/data/services/api/UsuarioApiService';
import { TokenModel } from '@app/data/interfaces/TokenModel';

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



  constructor(private usuarioApi:UsuarioApiService, private dlg:DialogService, private ref:DynamicDialogRef ) {
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
    this.usuarioApi.Login(this.login).subscribe((tokenModel:TokenModel)=> {
      debugger;

      this.ref.close(tokenModel);
    },(error:any)=>{
      console.error("Error en la peticion de login",error);
      this.ref.close(this.login);
    });
  }

  CerrarModal(): void {
    this.ref.close(null);
  }

}
