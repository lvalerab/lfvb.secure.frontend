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

import {ElementosModuleModule} from '@modules/elementos-module/elementos-module.module';

@NgModule({
  declarations: [
    ConfiguradorElementoComponentComponent
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
    ElementosModuleModule
  ]
})
export class PropiedadesModelModule { }
