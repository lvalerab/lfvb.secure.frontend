import { Component,Input, Output, ViewChild, ElementRef, Renderer2, computed, Signal } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '@app/shared/services/ToastService';
import { ModalLoginComponentComponent } from '../modal-login-component/modal-login-component.component';

import { VariableStateClass } from '@app/shared/utils/class/reactivo/VariableStateClass';
import {AuthService} from '@shared/services/AuthService';

interface UsuarioModel {
  Loggeado:boolean;
  Id:string|undefined;
  Nombre:string|undefined;
  Token:string|undefined;
}

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.less',
  providers:[DialogService]
})
export class LoginComponentComponent {

  @Input()
  usuario:VariableStateClass<UsuarioModel>=new VariableStateClass<UsuarioModel>();

  public OpcionesUsuario:MenuItem[]=[];
  _MenuMostrado:boolean=false;

  refDlg:DynamicDialogRef | undefined;

  public usuarioValido:Signal<boolean>=computed(()=>this.autServ.isAuthenticated());

  constructor(private renderer:Renderer2, private dlg:DialogService, private msg:ToastService, private autServ:AuthService) {
    this.refDlg=undefined;
  }

  NgOnInit() {
    
  }

  MuestraOpcionesLogin() {
    console.log("Pincha al menu");
    console.log(`Usuario valido: ${this.usuarioValido()}`);
    console.log(`Usuario valido: ${computed(()=>this.autServ.isAuthenticated())()}`);
    console.log(`token desde fuera ${this.autServ.token()}`);

    this._MenuMostrado=!this._MenuMostrado;
    //if(this.usuario.select("Loggeado")()) {
    //if(this.usuarioValido()) {
    if((!this.autServ.useSignal && this.autServ.isAuthenticated()) || (this.autServ.useSignal && this.usuarioValido())) {
      this.OpcionesUsuario=[
        {
          separator:true
        },
        {
          label:"Log out",
          icon: PrimeIcons.LOCK,
          command:()=>{
            this.autServ.logout();
            this.msg.mensaje.set({tipo:'success',titulo:'Logout',detalle:'El usuario ha cerrado sesión con éxito'});
          }
        }
      ];
    } else {
      this.OpcionesUsuario=[
        {
          label:"Log in",
          icon: PrimeIcons.LOCK_OPEN,
          command:()=>{
            this.MuestraDialogoValidarUsuario();
          }
        },
        {
          separator:true
        },
        {
          label:"Solicitud de registro",
          icon: PrimeIcons.DATABASE
        }
      ];
    }    
  }


  MuestraDialogoValidarUsuario() {
    this.refDlg=this.dlg.open(ModalLoginComponentComponent,{
      header:'Validar usuario', 
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body'
    });

    this.refDlg.onClose.subscribe((data:any)=>{
      if(data!=null) {
        this.msg.mensaje.set({tipo:'success',titulo:'Login', detalle:`Se ha validado con éxito`});
        this.refDlg?.destroy();
      } else {       
        this.refDlg?.destroy();
      }
    });
  }
}
