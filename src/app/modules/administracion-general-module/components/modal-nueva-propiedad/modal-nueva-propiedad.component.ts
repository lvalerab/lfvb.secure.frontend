import { Component, OnDestroy } from '@angular/core';
import { PropiedadElementoModel } from '@app/data/interfaces/PropiedadElementoModel';
import { ValorPropiedadElementoModel } from '@app/data/interfaces/ValorPropiedadElementoModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalBuscadorPropiedadesComponent } from '@app/modules/propiedades-model/components/modal-buscador-propiedades/modal-buscador-propiedades.component';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-modal-nueva-propiedad',
  standalone: false,
  templateUrl: './modal-nueva-propiedad.component.html',
  styleUrl: './modal-nueva-propiedad.component.less',
  providers:[DialogService]
})
export class ModalNuevaPropiedadComponent implements OnDestroy {
    ValorPropiedad:PropiedadElementoModel={
      id:null,
      idElemento:null,
      propiedad:null,
      activo:true,
      valores:[],
      fechaValor:null
    };

    opciones:MenuItem[]=[];

    constructor(private dlg:DialogService,
                private ref:DynamicDialogRef
    ) {

    }

    ngOnInit() {
      this.ConfiguraOpciones();
    }

    ConfiguraOpciones() {
      this.opciones=[];
      this.opciones.push({
        label:'Confirmar',
        icon:PrimeIcons.CHECK,
        command:()=>this.Aceptar()
      });
      this.opciones.push({
        label:'Cancelar',
        icon:PrimeIcons.EJECT,
        command:()=>this.Cancelar()
      })
    }

    Aceptar() {
      if(this.ref) {
        this.ref.close(this.ValorPropiedad);
      }
    }

    Cancelar() {
      if(this.ref) {
        this.ref.close();
      }
    }

    ngOnDestroy(): void {
      if(this.ref) {
        this.ref.destroy();
      }
    }

    ModalBuscarPropiedad(event:Event) {
      this.dlg.open(ModalBuscadorPropiedadesComponent,{
        header:"Buscar propiedad",     
        modal:true,
        width:'100vm',
        contentStyle:{overflow:'auto'},
        appendTo:'body',
        closable:true,
        inputValues:{
          tipoElemento:'apli'
        }
      }).onClose.subscribe((data)=> {
        this.ValorPropiedad.propiedad=data;
      });
      
    }
}
