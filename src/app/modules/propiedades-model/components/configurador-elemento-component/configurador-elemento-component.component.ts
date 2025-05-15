import { Component,Input,WritableSignal,Signal, signal } from '@angular/core';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
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
export class ConfiguradorElementoComponentComponent {

  @Input()
  Elemento:WritableSignal<ElementoModel|null>=signal(null);

  Propiedades:TreeNode[]=[];

  PropiedadSeleccionada:string|null=null;

  refDlg:DynamicDialogRef|undefined;

  constructor(private propApi:PropiedadesApiService, private dlg:DialogService) {
    this.refDlg=undefined;
  }

  ngOnInit() {
    this.GetArbolPropiedades();
  }

  GetArbolPropiedades() {
    let raiz:TreeNode={
      label:"Propiedades"
    };
    this.GetPropiedades(raiz,null);
    this.Propiedades=[raiz];
  }

  GetPropiedades(nodoPadre:TreeNode, padre:string|null) {
    this.propApi.Propiedades(padre).subscribe((lista)=>{
      let nodosHijos:TreeNode[]=[];
      for(var p in lista) {
        let nodo:TreeNode={
          icon:'pi pi-pw pi-sitemap',
          label:`${lista[p].codigo} - ${lista[p].nombre}`,          
        }
        this.GetPropiedades(nodo,lista[p].codigo);
        nodosHijos.push(nodo);
      }
      nodoPadre.icon=nodosHijos.length>0?'pi pi-pw pi-sitemap':'pi pi-pw pi-file';
      nodoPadre.children=nodosHijos;
    })
  }

  GetValorPropiedades(codProp:string, idElemento:string) {

  }


  BuscarElemento() {
    this.refDlg=this.dlg.open(ModalBuscadorElementosComponentComponent,{
      header:'Buscar elemento',
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body'
    });

    this.refDlg.onClose.subscribe((data:any)=>{
      this.Elemento.set(data);
      this.refDlg?.destroy();
    })
  }

  CuandoSeleccionaNodo(evento:TreeNodeSelectEvent) {
    let valores=evento.node.label?.split("-");
    if(valores && valores.length>0)
      this.PropiedadSeleccionada=valores[0].trim();
  }
}
