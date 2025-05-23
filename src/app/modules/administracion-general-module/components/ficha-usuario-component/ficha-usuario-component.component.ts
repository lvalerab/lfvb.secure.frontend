import { Component, WritableSignal,signal,Input } from '@angular/core';
import { PropiedadModel } from '@app/data/interfaces/PropiedadModel';
import { TipoCredencialModel } from '@app/data/interfaces/TipoCrendencialModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AdministracionUsuariosService } from '@app/data/services/api/AdministracionUsuariosService';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';
import { ToastService } from '@app/shared/services/ToastService';
import { TreeNode } from 'primeng/api';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { GrupoModel } from '@app/data/interfaces/GrupoModel';
import { CredencialUsuarioModel } from '@app/data/interfaces/CredencialUsuarioModel';
import { ActivatedRoute } from '@angular/router';

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
    Credenciales:CredencialUsuarioModel[]=[];

    ListaPropiedades:PropiedadModel[]=[];
    Propiedades:TreeNode[]=[];
    PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

    NombreGrupoFiltro:string="";
    GruposDisponibles:GrupoModel[]=[];
    GruposUsuario:GrupoModel[]=[];

    constructor(private admUsrServ:AdministracionUsuariosService,
                private msg:ToastService,
                private propApi:PropiedadesApiService,
                private rutaServ:ActivatedRoute
    ) {
      this.obsUsuario.subscribe(valor=>this.OnCuandoCambioUsuario(valor));
    }

    ngOnInit() {
      this.GetTiposCredenciales();
      this.GetGruposSistema();
      this.rutaServ.paramMap.subscribe(params=>{
          this.OnCambiaUsuario("id",params.get("id"));
      });
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

   
    CuandoSeleccionaPropiedad(prop:PropiedadModel|null) {
      if(prop!=null) {
        this.PropiedadSeleccionada.set(prop);
      } else {
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
      this.admUsrServ.CredencialesUsuarioLista(this.Usuario()?.id??"").subscribe(lista=>{
        this.Credenciales=lista;
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de credenciales del usuario',detalle:'No se ha podido obtener las credenciales del usuario'});
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
