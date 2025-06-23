import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TreeTableModule } from 'primeng/treetable';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { MenubarModule } from 'primeng/menubar';
import { CascadeSelectModule } from 'primeng/cascadeselect';

import { PropiedadesModelModule } from '../propiedades-model/propiedades-model.module';
import { ListadoAplicacionesComponentComponent } from './components/listado-aplicaciones-component/listado-aplicaciones-component.component';
import { FichaAplicacionComponentComponent } from './components/ficha-aplicacion-component/ficha-aplicacion-component.component';
import { ModalAltaNuevoUsuarioComponent } from './components/modal-alta-nuevo-usuario/modal-alta-nuevo-usuario.component';
import { ListadoGruposPermisosComponent } from './components/listado-grupos-permisos/listado-grupos-permisos.component';
import { FichaGrupoPermisosComponent } from './components/ficha-grupo-permisos/ficha-grupo-permisos.component';
import { ModalAltaNuevaAplicacionComponent } from './components/modal-alta-nueva-aplicacion/modal-alta-nueva-aplicacion.component';
import { ModalAltaNuevoGrupoPermisosComponent } from './components/modal-alta-nuevo-grupo-permisos/modal-alta-nuevo-grupo-permisos.component';
import { ModalNuevaPropiedadComponent } from './components/modal-nueva-propiedad/modal-nueva-propiedad.component';
import { ModalNuevoElementoAplicacionComponent } from './components/modal-nuevo-elemento-aplicacion/modal-nuevo-elemento-aplicacion.component';

@NgModule({
  declarations: [
    ListadoUsuariosComponentComponent,
    FichaUsuarioComponentComponent,
    ListadoAplicacionesComponentComponent,
    FichaAplicacionComponentComponent,
    ModalAltaNuevoUsuarioComponent,
    ListadoGruposPermisosComponent,
    FichaGrupoPermisosComponent,
    ModalAltaNuevaAplicacionComponent,
    ModalAltaNuevoGrupoPermisosComponent,
    ModalNuevaPropiedadComponent,
    ModalNuevoElementoAplicacionComponent
  ],
  imports: [
    AdministracionGeneralRouteModule,
    CommonModule,
    FormsModule,
    Dialog,
    ConfirmDialogModule,
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
    PickListModule,
    ConfirmPopupModule,
    TreeTableModule,
    MessageModule,
    CardModule,
    StepperModule,
    MenubarModule,
    CascadeSelectModule
  ],
})
export class AdministracionGeneralModuleModule { }
