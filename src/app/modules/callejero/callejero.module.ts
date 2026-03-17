import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelecTiposViasComponentComponent } from './components/atoms/selec-tipos-vias-component/selec-tipos-vias-component.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FluidModule } from 'primeng/fluid';
import { SelecTiposEntidadesTerritorialesComponent } from './components/atoms/selec-tipos-entidades-territoriales/selec-tipos-entidades-territoriales.component';
import { BuscadorEntidadesTerritorialesComponentComponent } from './components/buscador-entidades-territoriales-component/buscador-entidades-territoriales-component.component';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { SplitterModule } from 'primeng/splitter';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { BuscadorCallejeroComponent } from './components/buscador-callejero/buscador-callejero.component';
import { TabsModule } from 'primeng/tabs';
import { MantenimientoCallejeroComponentComponent } from './components/mantenimiento-callejero-component/mantenimiento-callejero-component.component';
import { routeCallejeroModule } from './routeCallejeroModule';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    SelecTiposViasComponentComponent,
    SelecTiposEntidadesTerritorialesComponent,
    BuscadorEntidadesTerritorialesComponentComponent,
    BuscadorCallejeroComponent,
    MantenimientoCallejeroComponentComponent
  ],
  imports: [
    routeCallejeroModule,
    CommonModule,
    FormsModule,
    MenubarModule,
    MegaMenuModule,
    PanelModule,
    SelectModule,
    MultiSelectModule,
    FluidModule,
    CardModule,
    FloatLabelModule,
    InputText,
    TableModule,
    DividerModule,
    MessageModule,
    SplitterModule,
    TabsModule,
    DynamicDialogModule
]
})
export class CallejeroModule { }
