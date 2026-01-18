import { NgModule, WritableSignal,Input,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbolUnidadAdministrativaComponentComponent } from './components/arbol-unidad-administrativa-component/arbol-unidad-administrativa-component.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { FichaArbolUnidadesOrganizativasComponent } from './components/ficha-arbol-unidades-organizativas/ficha-arbol-unidades-organizativas.component';
import { UnidadesAdministrativasRoutingModule } from './routesUnidadesAdministrativasModule';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import {ButtonGroupModule } from 'primeng/buttongroup';
import { FichaAdminArbolUnidadesAdministrativasComponent } from './components/ficha-admin-arbol-unidades-administrativas/ficha-admin-arbol-unidades-administrativas.component';
import { TooltipModule } from "primeng/tooltip";
import { FieldsetModule } from 'primeng/fieldset';
import { FichaUnidadAdministrativaComponent } from './components/ficha-unidad-administrativa/ficha-unidad-administrativa.component';
import {TreeSelectModule} from "primeng/treeselect";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { TabsModule } from 'primeng/tabs';
import { PropiedadesModelModule } from '../propiedades-model/propiedades-model.module';
import {ToolbarModule} from 'primeng/toolbar';



@NgModule({
  declarations: [
    ArbolUnidadAdministrativaComponentComponent,
    FichaArbolUnidadesOrganizativasComponent,
    FichaAdminArbolUnidadesAdministrativasComponent,
    FichaUnidadAdministrativaComponent
  ],
  imports: [
    UnidadesAdministrativasRoutingModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    OrganizationChartModule,
    CardModule,
    SplitterModule,
    FloatLabelModule,
    InputNumberModule,
    ScrollPanelModule,
    MessageModule,
    ButtonModule,
    ButtonGroupModule,
    TooltipModule,
    FieldsetModule,
    TreeSelectModule,
    InputText,
    Select,
    TabsModule,
    PropiedadesModelModule,
    ToolbarModule
]
})
export class UnidadAdministrativasModuleModule { 

 

}
