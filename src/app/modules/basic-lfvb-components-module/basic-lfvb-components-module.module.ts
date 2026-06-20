import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LfvbInputComponentComponent } from './atoms/lfvb-input-component/lfvb-input-component.component';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    LfvbInputComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FluidModule,
    InputTextModule,
    FloatLabelModule,
    DatePickerModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    MultiSelectModule,
    EditorModule,
    CardModule,
    MenubarModule
  ],
  exports:[
    LfvbInputComponentComponent
  ]
})
export class BasicLfvbComponentsModuleModule { }
