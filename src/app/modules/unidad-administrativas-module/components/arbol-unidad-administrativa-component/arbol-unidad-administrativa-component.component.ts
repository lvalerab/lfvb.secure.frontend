import { Component, Input, WritableSignal, signal, Output, EventEmitter } from '@angular/core';
import { UnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel';
import { UnidadesOrganizativasServices } from '@app/data/services/api/UnidadesAdministrativasServices';
import { ToastService } from '@app/shared/services/ToastService';
import { toObservable } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';
import { TipoUnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/TipoUnidadOrganizativaModel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {FichaUnidadAdministrativaComponent} from '../ficha-unidad-administrativa/ficha-unidad-administrativa.component';


@Component({
  selector: 'app-arbol-unidad-administrativa-component',
  standalone: false,
  templateUrl: './arbol-unidad-administrativa-component.component.html',
  styleUrl: './arbol-unidad-administrativa-component.component.less',
  providers:[DialogService]
})
export class ArbolUnidadAdministrativaComponentComponent {
 @Input()
  codUnorPadre:string|null=null;

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

  @Output() OnSelectUnidadAdministrativa=new EventEmitter<UnidadOrganizativaModel|null>;


  unidades:WritableSignal<UnidadOrganizativaModel[]>=signal([]);

  nodes:TreeNode[]=[];

  tipos:TipoUnidadOrganizativaModel[]=[];
  tipoSel:TipoUnidadOrganizativaModel|null=null;

  refDlg:DynamicDialogRef |undefined;

  constructor(private unorServ:UnidadesOrganizativasServices,
              private msg:ToastService,
              private dlg:DialogService
  ) {
    //Convierte los elementos en treenode
    toObservable(this.unidades).subscribe((items)=>{
      this.nodes=[];
      this.nodes.push({
        label:`Raiz segun filtro padre ${this.codUnorPadre??"Raiz"} y tipo ${this.tipoSel?.nombre??"Todos los tipos"}`,
        expanded:true,
        children:this.getTreeNodes(items)
      });
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
    this.unorServ.Arbol(this.codUnorPadre,this.tipoSel?.codigo,this.nivelMax??3).subscribe({
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
    this.OnSelectUnidadAdministrativa.emit(nodo);
    if(nodo) {
      this.codUnorPadre=nodo?.codigo??null;
    } else {
      this.codUnorPadre=null;
    }
    this.getArbol();
  }

  onRefrescarDatos(event:any) {
    this.codUnorPadre=null;
    this.getArbol();
  }


  //Ficha dialogo
  AbreFichaUnidad(unor:UnidadOrganizativaModel) {
    this.refDlg=this.dlg.open(FichaUnidadAdministrativaComponent,{
      header:"Ficha de u. organizativa",
      modal:true,
      breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
      inputValues:{
        unor:unor,
        padre:unor?.padre,
        tipo:unor?.tipoUnidadOrganizativa
      },
      closable:true,
      maximizable:true
    });

    this.refDlg.onClose.subscribe(()=>{
      this.getArbol();
    });
  }
}
