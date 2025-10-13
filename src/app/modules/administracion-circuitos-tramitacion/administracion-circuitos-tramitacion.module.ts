import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionCircuitosTramitacionRouteModule } from './routeAdministracionCircuitosTramitacion';
import { ListadoTramitesGeneralesComponent } from './components/listado-tramites-generales/listado-tramites-generales.component';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';




@NgModule({
  declarations: [
    ListadoTramitesGeneralesComponent
  ],
  imports: [
    CommonModule,
    AdministracionCircuitosTramitacionRouteModule,
    PanelModule,
    MessageModule
  ]
})
export class AdministracionCircuitosTramitacionModule { }
