import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/api";
import { UnidadOrganizativaModel } from "@data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel";
import { TreeRowNodeModel } from "@app/data/interfaces/TreeRow/TreeRowModel";

@Injectable({
    providedIn:'root'
})
export class ArbolUnidadAdministrativasServices {

    constructor() {

    }

    getTreeNodes(unor:UnidadOrganizativaModel[],expanded:boolean=true):TreeNode<any>[] {
      var el:TreeNode[]=[];
      for(let i=0;i<unor.length;i++) {
        let nt:TreeNode={
          label:unor[i].nombre??"",
          expanded:expanded,
          data:unor[i],
          children:this.getTreeNodes(unor[i].unidades??[])
        }
        el.push(nt);
      }
      return el;
    }

    getTreeRows(unor:UnidadOrganizativaModel[]):TreeRowNodeModel[] {
      var el:TreeRowNodeModel[]=[];
      for(let i=0;i<unor.length;i++) {
        let nt:TreeRowNodeModel={
          data:{
            nombre:unor[i].nombre??"",
            datos:unor[i]
          },          
          children:this.getTreeRows(unor[i].unidades??[])
        }
        el.push(nt);
      }
      return el;
    }

}