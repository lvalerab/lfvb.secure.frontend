import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorIdiomaComponent } from './components/selector-idioma/selector-idioma.component';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ListadoIdiomasComponent } from './components/listado-idiomas/listado-idiomas.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    SelectorIdiomaComponent,
    ListadoIdiomasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    TableModule,
    CardModule
  ],
  exports:[
    SelectorIdiomaComponent
  ]
})
export class I18NModule { }
