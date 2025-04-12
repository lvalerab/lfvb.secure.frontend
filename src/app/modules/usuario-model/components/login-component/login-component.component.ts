import { Component,Input, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

import { VariableStateClass } from '@app/shared/utils/class/reactivo/VariableStateClass';

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
  styleUrl: './login-component.component.less'
})
export class LoginComponentComponent {

  @Input()
  usuario:VariableStateClass<UsuarioModel>=new VariableStateClass<UsuarioModel>();

  public OpcionesUsuario:MenuItem[]=[];
  _MenuMostrado:boolean=false;


  constructor(private renderer:Renderer2) {}

  NgOnInit() {
    
  }

  MuestraOpcionesLogin() {
    console.log("Pincha al menu");
    this._MenuMostrado=!this._MenuMostrado;
    if(this.usuario.select("Loggeado")()) {
      this.OpcionesUsuario=[

      ];
    } else {
      this.OpcionesUsuario=[
        {
          label:"Log in",
          icon: PrimeIcons.LOCK_OPEN
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

}
