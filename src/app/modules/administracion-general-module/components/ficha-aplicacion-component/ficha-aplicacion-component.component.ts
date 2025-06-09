import { Component,Input,WritableSignal,signal } from '@angular/core';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ToastService } from '@app/shared/services/ToastService';
import { ActivatedRoute } from '@angular/router';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { ElementoAplicacionModel } from '@app/data/interfaces/ElementoAplicacionModel';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TreeTableNode } from 'primeng/api';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';

@Component({
  selector: 'app-ficha-aplicacion-component',
  standalone: false,
  templateUrl: './ficha-aplicacion-component.component.html',
  styleUrl: './ficha-aplicacion-component.component.less'
})
export class FichaAplicacionComponentComponent {
  @Input()
  Aplicacion:AplicacionModel|null=null;

  @Input()
  Id:WritableSignal<string|null>=signal(null);

  NodosElementos:TreeTableNode<ElementoAplicacionModel>[]=[];
  Grupos:GrupoModel[]=[];

  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);
  

  constructor(
            private appServ:AdministracionAplicacionesService,
            private msg:ToastService,                
            private rutaServ:ActivatedRoute,
  ) {
    
  }

  ngOnInit() {      
      this.rutaServ.paramMap.subscribe(params=>{
        debugger;
          this.Id.set(params.get("id"));
          this.OnCuandoCambiaId();
      });
  }

  OnCuandoCambiaId() {
    if(this.appServ!=null) {
      this.appServ.Aplicacion(this.Id()??"").subscribe(app=>{
        this.Aplicacion=app;
        this.Grupos=this.Aplicacion.grupos??[];
        this.NodosElementos=this.ObtenArbolElementosAplicacion(null);
        debugger;
      });
    }
  }

  CuandoSeleccionaPropiedad(event:PropiedadModel|null) {
    this.PropiedadSeleccionada.set(event);
  }



  ObtenArbolElementosAplicacion(elemento:ElementoAplicacionModel|null):TreeTableNode<ElementoAplicacionModel>[] {
    var nodos:TreeTableNode<ElementoAplicacionModel>[] =[];
    if(elemento==null && this.Aplicacion!=null && this.Aplicacion.elementos!=null) {
      debugger;
      this.Aplicacion?.elementos.forEach(e => {
        var aux:TreeTableNode={
          key:e.id??"",
          data:e
        };
        aux.children=this.ObtenArbolElementosAplicacion(e);
        aux.icon=(aux.children!=null && aux.children.length>0?"pi pi-tags":"pi pi-tag");
        nodos.push(aux);
      });
    } else {
      if(elemento?.elementos!=null) {
        elemento.elementos.forEach(e => {
        var aux:TreeTableNode={
          key:e.id??"",
          data:e
        };
        aux.children=this.ObtenArbolElementosAplicacion(e);
        aux.icon=(aux.children!=null && aux.children.length>0?"pi pi-tags":"pi pi-tag");
        nodos.push(aux);
      });
      }
    }
    return nodos;
  }
}
