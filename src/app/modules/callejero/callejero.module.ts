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
import { FichaViaComponentComponent } from './components/molecules/ficha-via-component/ficha-via-component.component';
import { FichaEntidadTerritorialComponentComponent } from './components/molecules/ficha-entidad-territorial-component/ficha-entidad-territorial-component.component';
import { SelectEntidadTerritorialComponentComponent } from './components/atoms/select-entidad-territorial-component/select-entidad-territorial-component.component';
import { SelectViaComponentComponent } from './components/atoms/select-via-component/select-via-component.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { AdministracionTiposEntidadesModalComponent } from './components/administracion-tipos-entidades-modal/administracion-tipos-entidades-modal.component';
import { AdministracionTiposViasModalComponent } from './components/administracion-tipos-vias-modal/administracion-tipos-vias-modal.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FichaDireccionNormalizadaComponentComponent } from './components/molecules/ficha-direccion-normalizada-component/ficha-direccion-normalizada-component.component';
import { FichaDireccionNoNormalizadaComponentComponent } from './components/molecules/ficha-direccion-no-normalizada-component/ficha-direccion-no-normalizada-component.component';
import { FichaDireccionComponentComponent } from './components/molecules/ficha-direccion-component/ficha-direccion-component.component';
import { ArbolEntidadTerritorialComponentComponent } from './components/atoms/arbol-entidad-territorial-component/arbol-entidad-territorial-component.component';



@NgModule({
  declarations: [
    SelecTiposViasComponentComponent,
    SelecTiposEntidadesTerritorialesComponent,
    BuscadorEntidadesTerritorialesComponentComponent,
    BuscadorCallejeroComponent,
    MantenimientoCallejeroComponentComponent,
    FichaViaComponentComponent,
    FichaEntidadTerritorialComponentComponent,
    SelectEntidadTerritorialComponentComponent,
    SelectViaComponentComponent,
    AdministracionTiposEntidadesModalComponent,
    AdministracionTiposViasModalComponent,
    FichaDireccionNormalizadaComponentComponent,
    FichaDireccionNoNormalizadaComponentComponent,
    FichaDireccionComponentComponent,
    ArbolEntidadTerritorialComponentComponent
  ],
  imports: [
    routeCallejeroModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    MegaMenuModule,
    MessageModule,
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
    DynamicDialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    ScrollPanelModule,
    //ArbolEntidadTerritorialComponentComponent
]
})
export class CallejeroModule { }
