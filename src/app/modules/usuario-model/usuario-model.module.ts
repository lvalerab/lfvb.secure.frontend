import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponentComponent } from './components/login-component/login-component.component';

import {AvatarModule} from 'primeng/avatar';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import {ContextMenu} from 'primeng/contextmenu';
import { MenuModule } from 'primeng/menu';
import { ModalLoginComponentComponent } from './components/modal-login-component/modal-login-component.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { PanelModule } from 'primeng/panel';
import { ListadoUsuariosComponentComponent } from './components/listado-usuarios-component/listado-usuarios-component.component';
import { TableModule } from 'primeng/table';
import {UsuariosRoutingModule} from './routeUsuariosModule';

@NgModule({
  declarations: [
    LoginComponentComponent,
    ModalLoginComponentComponent,
    ListadoUsuariosComponentComponent
  ],
  imports: [
    UsuariosRoutingModule,
    CommonModule,
    FormsModule,
    AvatarModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ContextMenu,
    MenuModule,
    PasswordModule,
    CheckboxModule,
    ToggleSwitchModule,
    FloatLabelModule,
    FluidModule,
    PanelModule,
    TableModule
  ],
  exports:[
    LoginComponentComponent
  ]
})
export class UsuarioModelModule { }
