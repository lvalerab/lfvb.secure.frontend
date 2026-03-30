import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { EntidadTerritorialModel } from '@app/data/interfaces/Callejero/EntidadTerritorialModel';
import { CallejeroService } from '@app/data/services/api/CallejeroService';
import { ToastService } from '@app/shared/services/ToastService';
import { DialogService, DynamicDialogRef  } from 'primeng/dynamicdialog';
import { BuscadorEntidadesTerritorialesComponentComponent } from '../../buscador-entidades-territoriales-component/buscador-entidades-territoriales-component.component';

@Component({
  selector: 'app-select-entidad-territorial-component',
  standalone: false,
  templateUrl: './select-entidad-territorial-component.component.html',
  styleUrl: './select-entidad-territorial-component.component.less',
  providers:[DialogService]
})
export class SelectEntidadTerritorialComponentComponent {

  model=model<EntidadTerritorialModel|null|undefined>(null);

  @Input()
  placeholder:string="Seleccione la entidad territorial";

  ref:DynamicDialogRef|undefined;

  constructor(private clsServ:CallejeroService,
              private msg:ToastService,
              private dlg:DialogService
  ) {

  }

  ngOnInit() {

  }

  modalBuscarEntidad(evento:any) {
    this.ref=this.dlg.open(BuscadorEntidadesTerritorialesComponentComponent,{
      width:'70vw',
      modal:true,
      closable:true,
      maximizable:true
    });

    this.ref.onClose.subscribe((enti:EntidadTerritorialModel|undefined)=>{
      if(enti) {
        this.model.set(enti);
      }
    });
  }

  quitarEntidad(event:any) {
    this.model.set(undefined);
  }
  
}
