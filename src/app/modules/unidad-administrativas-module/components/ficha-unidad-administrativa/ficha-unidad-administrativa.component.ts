import { Component,Input,WritableSignal,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TipoUnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/TipoUnidadOrganizativaModel';
import { UnidadOrganizativaModel } from '@app/data/interfaces/UnidadesOrganizativas/UnidadOrganizativaModel';
import { AdministracionUnidadesOrganizativasServices } from '@app/data/services/api/AdministracionUnidadesOrganizativasServices';
import { UnidadesOrganizativasServices } from '@app/data/services/api/UnidadesAdministrativasServices';
import { ToastService } from '@app/shared/services/ToastService';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-ficha-unidad-administrativa',
  standalone: false,
  templateUrl: './ficha-unidad-administrativa.component.html',
  styleUrl: './ficha-unidad-administrativa.component.less',
})
export class FichaUnidadAdministrativaComponent {

  @Input()
  padre:UnidadOrganizativaModel|null=null;

  @Input()
  tipo:TipoUnidadOrganizativaModel|null=null;
  
  @Input()
  unor:UnidadOrganizativaModel={
    codigo:null,
    nombre:null,
    padre:null,
    tipoUnidadOrganizativa:null,
    unidades:[]
  };

  listaTipos:TipoUnidadOrganizativaModel[]=[];
  arbol:TreeNode[]=[];
  selUniPadre:TreeNode|null=null;

  PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

  constructor(private admUnorSrv:AdministracionUnidadesOrganizativasServices,
              private unorSrv:UnidadesOrganizativasServices,
              private msg:ToastService
  ) {
    
  }

  ngOnInit() {
    this.getTiposUnidadesAdministrativas();
    this.getArbolUnidades();
  }

  getTiposUnidadesAdministrativas() {
    this.unorSrv.ListaTipos().subscribe({
      next:(lista)=>{
        this.listaTipos=lista;        
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Lista de tipos de u. organizativas',detalle:`No se ha podido obtener los tipos de unidades organizativas, causa: ${err.message}`});
      }
    })
  }

  ConvertUnorToTree(unors:UnidadOrganizativaModel[]):TreeNode[] {
    var devolver:TreeNode[]=[];
    for(let i=0;i<unors.length;i++) {
      let nodo:TreeNode={
        key:unors[i].codigo+'',
        label:unors[i].nombre+'',
        data:unors[i],
        children:this.ConvertUnorToTree(unors[i].unidades??[])
      };
      devolver.push(nodo);
    }
    return devolver;
  }

  getArbolUnidades() {
    this.unorSrv.Arbol(this.padre?.padre?.codigo??null,this.tipo?.codigo??null,999).subscribe({
      next:(ramas)=>{
        this.arbol=this.ConvertUnorToTree(ramas);
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Arbol de u. organizativas',detalle:`No se ha podido obtener el arbol de u. administrativas , causa: ${err.message}`});
      }
    });
  }

  CuandoSeleccionaTipo() {
    if(this.tipo?.codigo!=this.unor.tipoUnidadOrganizativa) {
      this.padre=null;
    }
    this.tipo=this.unor.tipoUnidadOrganizativa;
    this.getArbolUnidades();
  }

  CuandoSeleccionaUnidadPadre() {
    debugger;
    this.unor.padre=this.selUniPadre?.data;
  }


  CuandoSeleccionaPropiedad(prop:any) {
    if(prop!=null) {
        this.PropiedadSeleccionada.set(prop);
      } else {
        this.PropiedadSeleccionada.set(null);
      }
  }

  Guardar() {
    let method=null;
    if(this.unor.codigo) {
      method=this.admUnorSrv.ModificarUnidadOrganizativa(this.unor);
    } else {
      method=this.admUnorSrv.AltaUnidadOrganizativa(this.unor);
    }
    method.subscribe({
      next:(datos)=>{
        this.unor=datos;
        this.tipo=this.unor.tipoUnidadOrganizativa;
        this.padre=this.unor.padre;
        this.getArbolUnidades();
        this.getTiposUnidadesAdministrativas();
        this.msg.mensaje.set({tipo:'success',titulo:'Guardar datos',detalle:'Se han guardado con éxito los datos'});
      },
      error:(err)=>{
        this.msg.mensaje.set({tipo:'error',titulo:`Guardar datos`,detalle:`No se han podido guardar los datos, causa: ${err.message}`});
      }
    });
  }
}
