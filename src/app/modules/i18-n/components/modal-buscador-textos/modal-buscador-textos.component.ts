import { Component, Input, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-buscador-textos',
  standalone: false,
  templateUrl: './modal-buscador-textos.component.html',
  styleUrl: './modal-buscador-textos.component.less',
})
export class ModalBuscadorTextosComponent implements OnDestroy {
  @Input()
  titulo:string="Busqueda de textos";

  @Input()
  seleccion:boolean=false;

  refDlg:DynamicDialogRef|undefined;

  constructor(private dlg:DialogService,
              private ref:DynamicDialogRef
  ) {
    this.refDlg=ref;
  }

  ngOnDestroy(): void {
    this.ref.destroy();    
  }
}
