import { Component, Input, WritableSignal, signal } from '@angular/core';
import { UnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel';
import { UnidadesOrganizativasServices } from '@app/data/services/api/UnidadesAdministrativasServices';
import { ToastService } from '@app/shared/services/ToastService';
import { toObservable } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { TipoUnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/TipoUnidadOrganizativaModel';


@Component({
  selector: 'app-arbol-unidad-administrativa-component',
  standalone: false,
  templateUrl: './arbol-unidad-administrativa-component.component.html',
  styleUrl: './arbol-unidad-administrativa-component.component.less',
})
export class ArbolUnidadAdministrativaComponentComponent {
 @Input()
  codUnorPadre:WritableSignal<string|null>=signal(null);

  @Input()
  titulo:WritableSignal<string>=signal("Arbol de unidades administrativas");

  @Input()
  codTipoUnor:WritableSignal<string|null>=signal(null);

  @Input()
  nivelMax:number|null=999;

  @Input()
  administracion:boolean=false;

  @Input()
  seleccion:boolean=false;

  unidades:WritableSignal<UnidadOrganizativaModel[]>=signal([]);

  nodes:TreeNode[]=[];

  tipos:TipoUnidadOrganizativaModel[]=[];
  tipoSel:TipoUnidadOrganizativaModel|null=null;

  constructor(private unorServ:UnidadesOrganizativasServices,
              private msg:ToastService
  ) {
    //Convierte los elementos en treenode
    toObservable(this.unidades).subscribe((items)=>{
      this.nodes=this.getTreeNodes(items);
    });
    toObservable(this.codTipoUnor).subscribe((value)=>{
      this.SeleccionaNodo(null);
      this.getFiltroTipo();
    })
  }

  ngOnInit() {
    this.getTipos();
    this.getArbol();
  }

  getTipos() {
    this.unorServ.ListaTipos().subscribe({
      next:(tipos)=>{
        this.tipos=tipos;
        this.tipos.filter(x=>x.codigo==this.codTipoUnor())
        this.getFiltroTipo();
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'err',titulo:'Tipos de unidades',detalle:`No se ha podido obtener los tipos de unidades organizativas, causa ${error.message}`});
      }
    })
  }

  getFiltroTipo() {
    let aux=this.tipos.filter(x=>x.codigo==this.codTipoUnor());
    if(aux.length>0) {
      this.tipoSel=aux[0];
    } else {
      this.tipoSel=null;
    }
  }

  getArbol() {
    this.unorServ.Arbol(this.codUnorPadre(),this.tipoSel?.codigo,this.nivelMax??3).subscribe({
      next:(values)=>{
        this.unidades.set(values);
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:'err',titulo:'Arbol de unidades',detalle:`No se ha podido obtener el arbol de unidades, causa ${error.message}`});
      }
    });
  }

  getTreeNodes(unor:UnidadOrganizativaModel[]):TreeNode<any>[] {
    var el:TreeNode[]=[];
    for(let i=0;i<unor.length;i++) {
      let nt:TreeNode={
        label:unor[i].nombre??"",
        expanded:true,
        data:unor[i],
        children:this.getTreeNodes(unor[i].unidades??[])
      }
      el.push(nt);
    }
    return el;
  }


  SeleccionaNodo(nodo:UnidadOrganizativaModel|null) {
    if(nodo) {
      this.codUnorPadre.set(nodo?.padre?.codigo??null);
    } else {
      this.codUnorPadre.set(null);
    }
    this.getArbol();
  }

  onRefrescarDatos(event:any) {
    this.getArbol();
  }
}
