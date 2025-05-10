import { Component, OnDestroy, Output, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BuscadorElementosComponentComponent } from '../buscador-elementos-component/buscador-elementos-component.component';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';

@Component({
  selector: 'app-modal-buscador-elementos-component',
  standalone: false,
  templateUrl: './modal-buscador-elementos-component.component.html',
  styleUrl: './modal-buscador-elementos-component.component.less'
})
export class ModalBuscadorElementosComponentComponent implements OnDestroy {

    ref:DynamicDialogRef|undefined;

    @Input()
    filtros:ElementoModel|null=null;

    @Output()
    idSeleccionado:string|null=null;
    
    constructor(public dialogService:DialogService) {}

    show() {
      this.ref=this.dialogService.open(BuscadorElementosComponentComponent,{
        header:'Buscar un elemento asociado al usuario',
        width:'70%',
        contentStyle:{overflow:'auto'},
        maximizable:false,
        data:{
          filtros:this.filtros
        }
      });

      this.ref.onClose.subscribe((elemento:ElementoModel|null)=>{
        if(elemento) {
          this.idSeleccionado=elemento.id;
        }
      });
    }

    OnElementoSeleccionado(evento:any) {
      this.idSeleccionado=evento.id;
      this.ref?.close();
    }

    ngOnDestroy(): void {
      if(this.ref) {
        this.ref.close();
      }
    }
}
