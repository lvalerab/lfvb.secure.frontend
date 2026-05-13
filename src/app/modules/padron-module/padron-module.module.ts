import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallejeroModule } from '../callejero/callejero.module';
import { FormsModule } from '@angular/forms';
import { InputSexoPersonaComponentComponent } from './components/atoms/input-sexo-persona-component/input-sexo-persona-component.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { InputTipoPersonaComponentComponent } from './components/atoms/input-tipo-persona-component/input-tipo-persona-component.component';
import { InputTipoIdentificadorPersonaComponentComponent } from './components/atoms/input-tipo-identificador-persona-component/input-tipo-identificador-persona-component.component';
import { InputTipoRelacionPersonaComponentComponent } from './components/atoms/input-tipo-relacion-persona-component/input-tipo-relacion-persona-component.component';
import { InputTipoSituacionPersonaComponentComponent } from './components/atoms/input-tipo-situacion-persona-component/input-tipo-situacion-persona-component.component';
import { PanelIdentificadorPersonaComponentComponent } from './components/molecules/panel-identificador-persona-component/panel-identificador-persona-component.component';
import { CardModule } from 'primeng/card';
import { InputText } from "primeng/inputtext";
import { DatePickerModule } from 'primeng/datepicker';
import { MenubarModule } from 'primeng/menubar';
import { PanelBusquedaPersonaComponentComponent } from './components/molecules/panel-busqueda-persona-component/panel-busqueda-persona-component.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Divider, DividerModule } from "primeng/divider";
import { TableModule } from 'primeng/table';
import { BuscadorPersonasComponentComponent } from './components/buscador-personas-component/buscador-personas-component.component';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { PadronRountingModule } from './routesPadronModule';
import { LineaTiempoPersonaComponentComponent } from './components/molecules/linea-tiempo-persona-component/linea-tiempo-persona-component.component';
import { TimelineModule } from 'primeng/timeline';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FichaPersonaComponentComponent } from './components/ficha-persona-component/ficha-persona-component.component';
import {DrawerModule} from 'primeng/drawer';
import { TabsModule } from 'primeng/tabs';


@NgModule({
  declarations: [
    InputSexoPersonaComponentComponent,
    InputTipoPersonaComponentComponent,
    InputTipoIdentificadorPersonaComponentComponent,
    InputTipoRelacionPersonaComponentComponent,
    InputTipoSituacionPersonaComponentComponent,
    PanelIdentificadorPersonaComponentComponent,
    PanelBusquedaPersonaComponentComponent,
    BuscadorPersonasComponentComponent,
    LineaTiempoPersonaComponentComponent,
    FichaPersonaComponentComponent
  ],
  imports: [
    PadronRountingModule,
    CommonModule,
    FormsModule,
    MessageModule,
    CallejeroModule,
    FloatLabelModule,
    SelectModule,
    CardModule,
    InputText,
    DatePickerModule,
    CheckboxModule,
    DatePickerModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    TableModule,
    PanelModule,
    DividerModule,
    TimelineModule,
    DrawerModule,
    ScrollPanelModule,
    TabsModule
]
})
export class PadronModuleModule { }
