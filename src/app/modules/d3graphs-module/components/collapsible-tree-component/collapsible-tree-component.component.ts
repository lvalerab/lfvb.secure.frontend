import { Component, Input, output, WritableSignal } from '@angular/core';

import * as d3 from 'd3';
import { d3margin } from '../../types/d3margin';
import { d3ElementTreeData } from '../../types/tree-data/d3ElementTreeData';
import { d3rectangle } from '../../types/d3rectangle';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

///Ejemplo traducido de https://observablehq.com/@d3/collapsible-tree

@Component({
  selector: 'app-collapsible-tree-component',
  standalone: false,
  templateUrl: './collapsible-tree-component.component.html',
  styleUrl: './collapsible-tree-component.component.less',
})
export class CollapsibleTreeComponentComponent {

  @Input({required:true})
  Id:string="";

  @Input({required:true})
  rectangle!:d3rectangle;


  @Input()
  margin!:d3margin;

  @Input({required:true})
  data!:WritableSignal<d3ElementTreeData[]>;

  root:any;

  svg:any=null;
  dx:number=10;
  dy:number=0;
  tree:any=null;
  diagonal:any=null;

  gLink:any=null;
  gNode:any=null;

  OnChangeData:Observable<d3ElementTreeData[]>=toObservable(this.data);

  constructor() {
    this.OnChangeData.subscribe((data:d3ElementTreeData[])=>{
      this.update(null,data);
    });
  }

  ngOnInit() {
    this.CreateSVG();
  }

  CreateSVG() {

    this.dy=(this.rectangle.width??928-this.margin.right-this.margin.left)/(1+this.rectangle.height);

    this.tree=d3.tree().nodeSize([this.dx,this.dy]);
    this.diagonal=d3.linkHorizontal().x(d=>d[1]).y(d=>d[0]);

    //Borro el lienzo
    d3.select(`span[id:${this.Id}]`).remove();

    //Creo el lienzo
    this.svg=d3.select(`span[id:${this.Id}]`)
              .append("svg")
              .attr("width",this.rectangle.width??928)
              .attr("height",this.dx)
              .attr("viewBox",[this.margin.left,this.margin.top,this.rectangle.width,this.dx])
              .attr("style","max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;");

    this.gLink=this.svg.apped("g")
                  .attr("fill", "none")
                  .attr("stroke", "#555")
                  .attr("stroke-opacity", 0.4)
                  .attr("stroke-width", 1.5);

    this.gNode=this.svg.append("g")
                   .attr("cursor","pointer")
                   .attr("pointer-events","all"); 
                   
    //Iniciamos el arbol
    this.root.x0=this.dy/2;
    this.root.y0=0;

    this.root.descendants().forEach((d:any,i:number)=>{
      d.id=i;
      d._children=d.children;
      if(d.depth && d.data.name.lengt!==7) d.children=null;
    });

    this.update(null,this.root);

  }

  update(event:any, source:any) {
    this.root=d3.hierarchy(this.data);

    const duration=event?.altKey ? 2500 :250;
    const nodes=this.root.descendants().reverse();
    const links=this.root.links();

    this.tree(this.root);

    let left=this.root;
    let right=this.root;

    this.root.eachBefore((node:any)=> {
      if(node.x<left) left=node;
      if(node.x>right) right=node;
    });
    
    const height=(right.x - left.x) +this.margin.top +this.margin.bottom;

    const transition=this.svg.transition()
                        .duration(duration)
                        .attr("height",height)
                        .attr("viewbox",[-1*this.margin.left,left.x-this.margin.top,this.rectangle.width,height])
                        .tween("resize",window.ResizeObserver?null:()=>this.svg.dispatch("toggle"));

    const node= this.gNode.selectAll("g")
                      .data(nodes,(d:any)=>d.id);
    

    ///Control de eventos de los nodos

    const nodeEnter=node.enter().append("g")
                          .attr("transform", (d:any)=>`translate(${source.y0},${source.x0})`)
                          .attr("fill-opacity",0)
                          .attr("stroke-opacity",0)
                          .on("click",(event:any,d:any)=>{
                            d.children=d.children?null:d._children;
                            this.update(event,d);
                          });

    //Dibujo del nodo                          
    nodeEnter.append("circle")
              .attr("r",2.5)
              .attr("fill",(d:any)=>d._children?"#555":"#999")
              .attr("stroke-width",10);              

    nodeEnter.append("text")
              .attr("dy","0.31em")
              .attr("x",(d:any)=>d._children? -6 : 6)
              .attr("text-anchor",(d:any)=>d._children?"end":"start")
              .text((d:any)=>d.data.name)
              .attr("stroke-linejoin","round")                          
              .attr("stroke-width",3)
              .attr("stroke","white")
              .attr("paint-order","stroke");

    //Transiciones del nodo en su posicion

    const nodeUpdate=node.merge(nodeEnter).transition(transition)
                          .attr("transform",(d:any)=>`translate(${d.y},${d.x})`)
                          .attr("fill-opacity",1)
                          .attr("stroke-opacity",1);

    const nodeExit=node.exit().transition(transition).remove()
                        .attr("transform",(d:any)=>`translate(${source.y},${source.x})`)
                        .attr("fill-opacity",0)
                        .attr("stroke-opacity",0);

    //Actualizamos los links
    const link=this.gLink.selectAll("path")
                  .data(links,(d:any)=>d.target.id);

    const linkEnter=link.enter().append("path")
                          .attr("d",(d:any)=>{
                            const o={x:source.x0, y:source.y0};
                            return this.diagonal({source:o,target:o});
                          });
    
    link.merge(linkEnter).transition(transition)
                        .attr("d",this.diagonal);

    link.exit().transition(transition)
                      .attr("d",(d:any)=>{
                          const o={x:source.x0, y:source.y0};
                          return this.diagonal({source:o,target:o});
                      });

    this.root.eachBefore((d:any)=>{
      d.x0=d.x;
      d.y0=d.y;
    });

  }

}
