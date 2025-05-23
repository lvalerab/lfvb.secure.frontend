import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguradorElementoComponentComponent } from './components/configurador-elemento-component/configurador-elemento-component.component';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PropiedadesRoutingModule } from './routesPropiedadesModule';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Dialog } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TimelineModule } from 'primeng/timeline';


import {ElementosModuleModule} from '@modules/elementos-module/elementos-module.module';
import { PanelPropiedadElementoComponentComponent } from './components/panel-propiedad-elemento-component/panel-propiedad-elemento-component.component';
import { ArbolSelectorPropiedadesComponentComponent } from './components/arbol-selector-propiedades-component/arbol-selector-propiedades-component.component';

@NgModule({
  declarations: [
    ConfiguradorElementoComponentComponent,
    PanelPropiedadElementoComponentComponent,
    ArbolSelectorPropiedadesComponentComponent
  ],
  exports:[
    PanelPropiedadElementoComponentComponent,
    ArbolSelectorPropiedadesComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PropiedadesRoutingModule,
    PanelModule,
    TreeModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    MessageModule,
    SplitterModule,
    ScrollPanelModule,
    Dialog,
    ElementosModuleModule,
    CardModule,
    FieldsetModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
    IftaLabelModule,
    ToggleButtonModule,
    TimelineModule
  ]
})
export class PropiedadesModelModule { }
