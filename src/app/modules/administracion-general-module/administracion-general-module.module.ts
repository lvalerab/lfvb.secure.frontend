import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { PanelModule } from 'primeng/panel';
import { ListadoUsuariosComponentComponent } from './components/listado-usuarios-component/listado-usuarios-component.component';
import { TableModule } from 'primeng/table';
import {AdministracionGeneralRouteModule} from './routeAdministracionGeneralModule';
import { FichaUsuarioComponentComponent } from './components/ficha-usuario-component/ficha-usuario-component.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { SplitterModule } from 'primeng/splitter';
import { TreeModule } from 'primeng/tree';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PickListModule } from 'primeng/picklist';

import { PropiedadesModelModule } from '../propiedades-model/propiedades-model.module';

@NgModule({
  declarations: [
    ListadoUsuariosComponentComponent,
    FichaUsuarioComponentComponent
  ],
  imports: [
    AdministracionGeneralRouteModule,
    CommonModule,
    FormsModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    PasswordModule,
    CheckboxModule,
    ToggleSwitchModule,
    FloatLabelModule,
    FluidModule,
    PanelModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    InputGroupAddonModule,
    TabsModule,
    SelectModule,
    SplitterModule,
    TreeModule,
    ScrollPanelModule,
    PropiedadesModelModule,
    PickListModule
  ],
})
export class AdministracionGeneralModuleModule { }
