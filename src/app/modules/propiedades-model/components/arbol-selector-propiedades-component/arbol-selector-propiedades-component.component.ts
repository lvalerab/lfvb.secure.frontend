import { Component,Output,EventEmitter,Input } from '@angular/core';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TipoPropiedadModel } from '@app/data/interfaces/TipoPropiedadModel';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { ToastService } from '@app/shared/services/ToastService';
import { TreeNode } from 'primeng/api';
import { TreeNodeSelectEvent } from 'primeng/tree';

@Component({
  selector: 'app-arbol-selector-propiedades-component',
  standalone: false,
  templateUrl: './arbol-selector-propiedades-component.component.html',
  styleUrl: './arbol-selector-propiedades-component.component.less'
})
export class ArbolSelectorPropiedadesComponentComponent {

  @Output()
  PropiedadSeleccionada:EventEmitter<PropiedadModel|null>=new EventEmitter<PropiedadModel|null>();

  @Input()
  FiltroTipoElemento:string|null=null;

  propiedades:PropiedadModel[]=[];

  Nodos:TreeNode[]=[];
  Raiz:TreeNode|null=null;
  
  constructor(private propApi:PropiedadesApiService, 
              private msg:ToastService) {

  }

  ngOnInit() {
    this.GetArbolPropiedades();
  }

  ObtenNodosArbol(padre:PropiedadModel):TreeNode[] {
    var nodos:TreeNode[]=[]
    padre.propiedades?.forEach(e => {
      var aux:TreeNode={
         icon:'pi pi-pw pi-file',
         label:`${e.codigo} - ${e.nombre}`
      };
      aux.children=this.ObtenNodosArbol(e);
      nodos.push(aux);
    });
    return nodos;
  }

  GetArbolPropiedades() {
    this.Raiz={
      label:"Propiedades",
      icon:'pi pi-pw pi-folder-plus',
      children:[]
    };
    this.propApi.Propiedades(null,this.FiltroTipoElemento).subscribe({
      next:(listado)=>{
        this.propiedades=listado;
        listado.forEach(p=>{
          var prop:TreeNode={
            label:`${p.codigo} - ${p.nombre}`
          };
          prop.children=this.ObtenNodosArbol(p);
          if(prop.children.length>0) {
            prop.icon='pi pi-pw pi-folder';
          } else {
            prop.icon='pi pi-pw pi-file';
          }
          this.Raiz?.children?.push(prop);
        });
        if(this.Raiz!=null && (this.Raiz.children??[]).length>0)
          this.Nodos=[this.Raiz];
        else 
          this.Nodos=[]; 
      },
      complete:()=>{
        
      },
      error:(e)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Obtener arbol de propiedades',detalle:`Error al obtener el arbol de propiedades, causa ${e}`})
      }
    })
  }

  BuscarPropiedadEnElArbol(codProp:string, propiedades:PropiedadModel[]):PropiedadModel|null {
    var elemento:PropiedadModel|null=null;
    var encontrados=propiedades.filter(x=>x.codigo==codProp.trim());
    if(encontrados.length==0) {
      for(var i=0;i<propiedades.length;i++) {
        if((propiedades[i]?.propiedades??[]).length>0) {
          elemento=this.BuscarPropiedadEnElArbol(codProp,propiedades[i].propiedades??[]);
        }
      }
    } else {
      elemento=encontrados[0];
    }
    return elemento;
  }
  

  CuandoSeleccionaNodo(evento:TreeNodeSelectEvent) {
    debugger;
    let valores=evento.node.label?.split("-");
    if(valores && valores.length>0) {
      var aux=this.BuscarPropiedadEnElArbol(valores[0].trim(),this.propiedades); 
      if(aux!=null)
        this.PropiedadSeleccionada.emit(aux);
      else 
        this.PropiedadSeleccionada.emit(null);
    }
  }
}
