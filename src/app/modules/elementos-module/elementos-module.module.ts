import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import {ElementosRoutingModule} from './routesElementosModule';

import { BuscadorElementosComponentComponent } from './componentes/buscador-elementos-component/buscador-elementos-component.component';
import { ModalBuscadorElementosComponentComponent } from './componentes/modal-buscador-elementos-component/modal-buscador-elementos-component.component';
@NgModule({
  declarations: [
    BuscadorElementosComponentComponent,
    ModalBuscadorElementosComponentComponent
  ],
  imports: [
    CommonModule,
    ElementosRoutingModule,
    PaginatorModule,
    TableModule,
    PanelModule,
    FluidModule,
    MessageModule,
    DynamicDialogModule,
    FormsModule
  ]
})
export class ElementosModuleModule { }
