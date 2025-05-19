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

  Propiedades:TreeNode[]=[];

  ListaPropiedades:PropiedadModel[]=[];

  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  refDlg:DynamicDialogRef|undefined;

  constructor(private propApi:PropiedadesApiService, private dlg:DialogService) {
    this.refDlg=undefined;
  }

  ngOnInit() {
    this.GetArbolPropiedades();
  }

  ngOnDestroy(): void {
    
  }

  GetArbolPropiedades() {
    let raiz:TreeNode={
      label:"Propiedades"
    };
    this.ListaPropiedades=[];
    this.GetPropiedades(raiz,null);
    this.Propiedades=[raiz];
  }

  GetPropiedades(nodoPadre:TreeNode, padre:string|null) {
    this.propApi.Propiedades(padre).subscribe((lista)=>{
      if(this.ListaPropiedades.length<=0) {
        this.ListaPropiedades=lista;
      };
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
      appendTo:'body',
      baseZIndex:99999
    });

    this.refDlg.onClose.subscribe((data:any)=>{
      this.Elemento.set(data);
      this.refDlg?.destroy();
    })
  }

  CuandoSeleccionaNodo(evento:TreeNodeSelectEvent) {
    let valores=evento.node.label?.split("-");
    if(valores && valores.length>0) {
      var aux=this.ListaPropiedades.filter(x=>x.codigo==valores[0].trim());
      if(aux.length>=0)
        this.PropiedadSeleccionada.set(aux[0]);
      else 
        this.PropiedadSeleccionada.set(null);
    }
  }
}
