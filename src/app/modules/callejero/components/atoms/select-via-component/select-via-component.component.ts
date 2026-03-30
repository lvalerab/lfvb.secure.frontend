import { Component, model, Input} from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { CallejeroModel } from '@data/interfaces/Callejero/CallejeroModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Toast } from 'primeng/toast';
import { BuscadorCallejeroComponent } from '../../buscador-callejero/buscador-callejero.component';

@Component({
  selector: 'app-select-via-component',
  standalone: false,
  templateUrl: './select-via-component.component.html',
  styleUrl: './select-via-component.component.less',
  providers:[DialogService]
})
export class SelectViaComponentComponent {

  model=model<CallejeroModel|undefined|null>(null);

  @Input()
  placeholder:string="Nombre de la via";

  @Input()
  entidadPadre:EntidadTerritorialModel|undefined|null;

  ref:DynamicDialogRef|undefined;

  constructor(private clsSer:CallejeroService,
              private dlg:DialogService,
              private msg:ToastService
  ) {

  }

  modalBuscarVia(event:any) {
    this.ref=this.dlg.open(BuscadorCallejeroComponent,{
      width:'70vw',
      modal:true,
      closable:true,
      maximizable:true    
    });

    this.ref.onClose.subscribe((value)=>{
      if(value) {
        this.model.set(value);
      }
    });
  }

  quitarVia(event:any) {
    this.model.set(undefined);
  }

}
