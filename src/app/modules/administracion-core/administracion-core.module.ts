import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaAdministracionCoreAplicacionComponent } from './componentes/ficha-administracion-core-aplicacion/ficha-administracion-core-aplicacion.component';
import { FormsModule } from '@angular/forms';
import { PropiedadesModelModule } from '../propiedades-model/propiedades-model.module';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { TabsModule } from 'primeng/tabs';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {routeAdministracionCoreModule} from './routeAdministracionCoreModule';


@NgModule({
  declarations: [
    FichaAdministracionCoreAplicacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routeAdministracionCoreModule,
    PropiedadesModelModule,
    CardModule,
    SplitterModule,
    TabsModule,
    ScrollPanelModule
  ]
})
export class AdministracionCoreModule { }
