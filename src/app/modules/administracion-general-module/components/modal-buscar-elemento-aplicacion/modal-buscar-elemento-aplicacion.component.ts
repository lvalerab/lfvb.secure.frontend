import { Component, Input,OnDestroy,WritableSignal,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { ElementoAplicacionModel } from '@app/data/interfaces/ElementoAplicacionModel';
import { AdministracionAplicacionesService } from '@app/data/services/api/AdministracionAplicacionesService';
import { ToastService } from '@app/shared/services/ToastService';
import { TreeNode } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-buscar-elemento-aplicacion',
  standalone: false,
  templateUrl: './modal-buscar-elemento-aplicacion.component.html',
  styleUrl: './modal-buscar-elemento-aplicacion.component.less'
})
export class ModalBuscarElementoAplicacionComponent implements OnDestroy {
  @Input()
  aplicacion:AplicacionModel|null=null;

  elementos:WritableSignal<ElementoAplicacionModel[]>=signal([]);
  nodos:TreeNode[]=[];
  OnSetElementos:Observable<ElementoAplicacionModel[]>=toObservable(this.elementos);
  seleccion:TreeNode|null=null;

  constructor(private admAplServ:AdministracionAplicacionesService,
              private msg:ToastService,
              private ref:DynamicDialogRef
  ) {

  }

  ngOnInit() {
    this.OnSetElementos.subscribe((elem)=>{
      this.nodos=this.CrearTreeNodes(elem,0);
    });
    this.ObtenElementosAplicacion();
  }

  ngOnDestroy(): void {
    if(this.ref) {
      this.ref.destroy();
    }
  }

  CrearTreeNodes(elementos:ElementoAplicacionModel[], fil:number=0):TreeNode[] {
    var nodos:TreeNode[]=[];
    var col=0;
    elementos.forEach(e=>{
      var nodo:TreeNode={
        key:fil+"_"+col,
        label:e.id??"",
        data:e,
        icon: 'pi pi-fw pi-cog'
      };
      if(e.elementos!=null && e.elementos.length>0) {
        nodo.children=this.CrearTreeNodes(e.elementos,fil+1);
      }
      nodos.push(nodo);
      col++;
    });
    return nodos;
  }

  ObtenElementosAplicacion() {
    if(this.aplicacion!=null && this.aplicacion.id!=null) {
      this.admAplServ.Aplicacion(this.aplicacion.id).subscribe({
        next:(apli)=>{
          this.elementos.set(apli.elementos??[]);
        },
        error:(err)=>{
          this.msg.mensaje.set({tipo:'error',titulo:'Listado de elementos',detalle:`No se ha podido obtener el listado de elementos de la aplicación seleccionada, causa: ${err}`});
        }
      })
    } else {
      this.elementos.set([]);
    }
  }

  CuandoSeleccionaValor(event:any) {
    this.ref.close(this.seleccion?.data);
  }
}
