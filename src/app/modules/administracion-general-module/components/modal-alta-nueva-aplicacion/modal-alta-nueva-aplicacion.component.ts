import { Component, OnDestroy } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { ToastService } from '@app/shared/services/ToastService';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-alta-nueva-aplicacion',
  standalone: false,
  templateUrl: './modal-alta-nueva-aplicacion.component.html',
  styleUrl: './modal-alta-nueva-aplicacion.component.less'
})
export class ModalAltaNuevaAplicacionComponent implements OnDestroy {
  nuevaAplicacion:AplicacionModel={id:"",codigo:"",nombre:"",elementos:[],grupos:[]};

  constructor(private ref:DynamicDialogRef,
              private msg:ToastService,
              private admAplicacionServ:AdministracionAplicacionesService
  ) {

  }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }


  AltaApliacion() {

  }
}
