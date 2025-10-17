import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionCircuitosTramitacionRouteModule } from './routeAdministracionCircuitosTramitacion';
import { ListadoTramitesGeneralesComponent } from './components/listado-tramites-generales/listado-tramites-generales.component';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from "primeng/button";
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';





@NgModule({
  declarations: [
    ListadoTramitesGeneralesComponent
  ],
  imports: [
    CommonModule,
    AdministracionCircuitosTramitacionRouteModule,
    PanelModule,
    MessageModule,
    FluidModule,
    ButtonModule,
    MenuModule,
    TableModule
]
})
export class AdministracionCircuitosTramitacionModule { }
