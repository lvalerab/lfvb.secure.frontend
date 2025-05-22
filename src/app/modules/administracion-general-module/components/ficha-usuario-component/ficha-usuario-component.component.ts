import { Component, WritableSignal,signal,Input } from '@angular/core';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TipoCredencialModel } from '@app/data/interfaces/TipoCrendencialModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { ToastService } from '@app/shared/services/ToastService';
import { TreeNode } from 'primeng/api';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';

@Component({
  selector: 'app-ficha-usuario-component',
  standalone: false,
  templateUrl: './ficha-usuario-component.component.html',
  styleUrl: './ficha-usuario-component.component.less'
})
export class FichaUsuarioComponentComponent {

    @Input()
    Usuario:WritableSignal<UsuarioModel|null>=signal(null);

    obsUsuario:Observable<UsuarioModel|null>=toObservable(this.Usuario);

    TiposCredenciales:WritableSignal<TipoCredencialModel[]>=signal([]);

    ListaPropiedades:PropiedadModel[]=[];
    Propiedades:TreeNode[]=[];
    PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

    NombreGrupoFiltro:string="";
    GruposDisponibles:GrupoModel[]=[];
    GruposUsuario:GrupoModel[]=[];

    constructor(private admUsrServ:AdministracionUsuariosService,
                private msg:ToastService,
                private propApi:PropiedadesApiService
    ) {
      this.obsUsuario.subscribe(valor=>this.OnCuandoCambioUsuario(valor));
    }

    ngOnInit() {
      this.GetTiposCredenciales();
      this.GetArbolPropiedades();
      this.GetGruposSistema();
    }

    OnCambiaUsuario(campo:string,valor:any) {
      let aux:UsuarioModel=this.Usuario()??{id:"",nombre:"",loggeado:false,token:""};
      switch(campo) {
        case 'id':
          aux.id=valor;
          break;
        case 'user':
          aux.nombre=valor;
          break;
        case 'nombre':
          break;
        case '1apellido':
          break;
        case '2apellido':
          break;
      }
      this.Usuario.set(aux);
    }

    GetTiposCredenciales() {
      this.admUsrServ.TiposCredencialesLista().subscribe(lista=>{
        this.TiposCredenciales.set(lista);
      },error=>{
        this.msg.mensaje.set({
                              tipo:'error',
                              titulo:'Tipos de credenciales',
                              detalle:`No se ha podido obtener el listado de tipos de credenciales, causa: ${error}`
                            });
      });
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

    CuandoSeleccionaNodoPropiedad(evento:any) {
      let valores=evento.node.label?.split("-");
      if(valores && valores.length>0) {
        var aux=this.ListaPropiedades.filter(x=>x.codigo==valores[0].trim());
        if(aux.length>=0)
          this.PropiedadSeleccionada.set(aux[0]);
        else 
          this.PropiedadSeleccionada.set(null);
      }
    }

    OnCuandoCambioUsuario(data:UsuarioModel|null) {
      //Obtenemos el listado de credenciales del usuario, y los grupos
      this.admUsrServ.GruposUsuarioLista(this.Usuario()?.id??"").subscribe(lista=>{
        this.GruposUsuario=lista;
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de grupos del usuario',detalle:'No se ha podido obtener los grupos del usuario indicado'});
      });
    }

    GetGruposSistema() {
      this.admUsrServ.GruposLista().subscribe((grupos)=>{
        this.GruposDisponibles=grupos;
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de grupos del sistema',detalle:'No se ha podido obtener los grupos del sistema'});
      })
    }
}
