import { Component,Input,WritableSignal,Signal, signal, OnDestroy } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { ModalBuscadorElementosComponentComponent } from '@app/modules/elementos-module/componentes/modal-buscador-elementos-component/modal-buscador-elementos-component.component';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeNodeSelectEvent } from 'primeng/tree';

@Component({
  selector: 'app-configurador-elemento-component',
  standalone: false,
  templateUrl: './configurador-elemento-component.component.html',
  styleUrl: './configurador-elemento-component.component.less',
  providers:[DialogService]
})
export class ConfiguradorElementoComponentComponent implements OnDestroy {

  @Input()
  Elemento:WritableSignal<ElementoModel|null>=signal(null);


  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  refDlg:DynamicDialogRef|undefined;

  constructor(private propApi:PropiedadesApiService, private dlg:DialogService) {
    this.refDlg=undefined;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    
  }



  GetValorPropiedades(codProp:string, idElemento:string) {

  }


  BuscarElemento() {
    this.refDlg=this.dlg.open(ModalBuscadorElementosComponentComponent,{
      header:'Buscar elemento',
      closable:true,
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body',
      baseZIndex:99999
    });

    this.refDlg.onClose.subscribe((data:any)=>{
      this.Elemento.set(data);
      this.refDlg?.destroy();
    })
  }



  CuandoSeleccionaPropiedad(valor:PropiedadModel|null) {
    this.PropiedadSeleccionada.set(valor);
  }
}
