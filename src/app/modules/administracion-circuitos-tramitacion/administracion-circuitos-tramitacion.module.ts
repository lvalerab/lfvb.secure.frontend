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
import { TooltipModule } from 'primeng/tooltip';
import { FichaTramiteComponentComponent } from './components/ficha-tramite-component/ficha-tramite-component.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabel } from "primeng/floatlabel";
import { InputText } from "primeng/inputtext";
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { Menubar } from "primeng/menubar";
import { TabsModule } from 'primeng/tabs';





@NgModule({
  declarations: [
    ListadoTramitesGeneralesComponent,
    FichaTramiteComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministracionCircuitosTramitacionRouteModule,
    PanelModule,
    MessageModule,
    FluidModule,
    ButtonModule,
    MenuModule,
    TableModule,
    TooltipModule,
    FieldsetModule,
    FloatLabel,
    InputText,
    TextareaModule,
    Menubar,
    TabsModule
]
})
export class AdministracionCircuitosTramitacionModule { }
