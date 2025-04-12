import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponentComponent } from './components/login-component/login-component.component';

import {AvatarModule} from 'primeng/avatar';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
//import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    LoginComponentComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    //TieredMenuModule,
    MenuModule
  ],
  exports:[
    LoginComponentComponent
  ]
})
export class UsuarioModelModule { }
