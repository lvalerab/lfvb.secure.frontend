import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorIdiomaComponent } from './components/selector-idioma/selector-idioma.component';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ListadoIdiomasComponent } from './components/listado-idiomas/listado-idiomas.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {I18NRoutingModule} from './routesI18NModule';
import { MenuModule } from 'primeng/menu';
import { FichaIdiomaComponent } from './components/ficha-idioma/ficha-idioma.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputText } from "primeng/inputtext";
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from "primeng/panel";
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenubarModule } from "primeng/menubar";
import { PropiedadesModelModule } from '../propiedades-model/propiedades-model.module';
import { TabsModule } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ListaComposicionesComponent } from './components/composiciones/lista-composiciones/lista-composiciones.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { EditorTextosIdiomasComponent } from './components/editor-textos-idiomas/editor-textos-idiomas.component';
import { EditorModule } from 'primeng/editor';
import { BuscadorTextosComponent } from './components/buscador-textos/buscador-textos.component';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [
    SelectorIdiomaComponent,
    ListadoIdiomasComponent,
    FichaIdiomaComponent,
    ListaComposicionesComponent,
    EditorTextosIdiomasComponent,
    BuscadorTextosComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    I18NRoutingModule,
    SelectModule,
    ButtonModule,
    TableModule,
    CardModule,
    MenuModule,
    FloatLabelModule,
    ToggleButtonModule,
    InputText,
    SplitterModule,
    PanelModule,
    DialogModule,
    DynamicDialogModule,
    MenubarModule,
    TabsModule,
    DividerModule,
    MessageModule,
    PanelModule,
    ScrollPanelModule,
    PropiedadesModelModule,
    InputGroupModule,
    InputGroupAddonModule,
    EditorModule,
    MultiSelectModule
],
  exports:[
    SelectorIdiomaComponent
  ]
})
export class I18NModule { }
