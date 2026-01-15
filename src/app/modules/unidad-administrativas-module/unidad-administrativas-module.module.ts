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




@NgModule({
  declarations: [
    ArbolUnidadAdministrativaComponentComponent,
    FichaArbolUnidadesOrganizativasComponent
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
    ButtonModule
  ]
})
export class UnidadAdministrativasModuleModule { 

 

}
