import { Component, WritableSignal,signal,Input, OnDestroy } from '@angular/core';
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
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ficha-usuario-component',
  standalone: false,
  templateUrl: './ficha-usuario-component.component.html',
  styleUrl: './ficha-usuario-component.component.less',
  providers:[ConfirmationService]
})
export class FichaUsuarioComponentComponent implements OnDestroy {

    @Input()
    Usuario:WritableSignal<UsuarioModel|null>=signal(null);

    obsUsuario:Observable<UsuarioModel|null>=toObservable(this.Usuario);

    TiposCredenciales:WritableSignal<TipoCredencialModel[]>=signal([]);
    TipoCredencialSeleccionada:TipoCredencialModel|null=null;
    Credenciales:CredencialUsuarioModel[]=[];


    ListaPropiedades:PropiedadModel[]=[];
    Propiedades:TreeNode[]=[];
    PropiedadSeleccionada:WritableSignal<PropiedadModel|null>=signal(null);

    NombreGrupoFiltro:string="";
    Grupos:GrupoModel[]=[];
    GruposDisponibles:GrupoModel[]=[];
    GruposUsuario:GrupoModel[]=[];
    Cambiado:boolean=false;

    constructor(private admUsrServ:AdministracionUsuariosService,
                private msg:ToastService,                
                private rutaServ:ActivatedRoute,
                private confServ:ConfirmationService
    ) {
      //this.obsUsuario.subscribe(valor=>this.OnCuandoCambioUsuario(valor));
    }

    ngOnInit() {
      this.GetTiposCredenciales();
      this.GetGruposSistema();
      this.rutaServ.paramMap.subscribe(params=>{
        debugger;
        var id=params.get("id");
        this.admUsrServ.Usuario(id??"").subscribe(user=>{          
            this.Usuario.set(user);
            this.OnCuandoCambioUsuario(user);
          },
          error=>{
            console.log("error al obtener los datos del usuario",error);
            this.Usuario.set(null);
            this.msg.mensaje.set({tipo:'error',titulo:'Datos del usuario',detalle:'No se ha podido obtener los datos del usuario seleccionado'});
          });  
      });
    }

    ngOnDestroy(): void {
      if(this.Cambiado) {
        if(this.Usuario()?.id) {
          this.admUsrServ.ActualizaUsuario(this.Usuario()??{id:"",usuario:"",email:"", nombre:"",apellido1:"", apellido2:"",loggeado:false,token:"",credenciales:[],grupos:[]}).subscribe(
            {
              next:(dto)=>{
                this.msg.mensaje.set({tipo:'success',titulo:'Actualizar datos del usuario',detalle:'Se han actualizado los datos del usuario correctamente'});
              },
              error:(error)=>{
                this.msg.mensaje.set({tipo:'error',titulo:'Actualizar datos del usuario',detalle:'No se ha podido actualizar el usuario actual'});
              }
            }
          )
        }
      }
    }

    OnCambiaUsuario(campo:string,valor:any) {
      let aux:UsuarioModel=this.Usuario()??{id:"",usuario:"",email:"", nombre:"",apellido1:"", apellido2:"",loggeado:false,token:"",credenciales:[],grupos:[]};
      switch(campo) {
        case 'id':
          aux.id=valor;          
          break;
        case 'user':
          aux.usuario=valor;
          break;
        case 'nombre':
          aux.nombre=valor;
          break;
        case 'apellido1':
          aux.apellido1=valor;
          break;
        case 'apellido2':
          aux.apellido2=valor;
          break;
        case 'email':
          aux.email=valor;
      }
      this.Usuario.set(aux);
      this.Cambiado=true;
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
      this.GetGruposUsuario();
      this.GetCredencialesUsuario();
    }

    GetGruposSistema() {
      this.admUsrServ.GruposLista().subscribe((grupos)=>{
        this.Grupos=grupos;
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de grupos del sistema',detalle:'No se ha podido obtener los grupos del sistema'});
      })
    }

    GetGruposUsuario() {
      this.admUsrServ.GruposUsuarioLista(this.Usuario()?.id??"").subscribe(lista=>{
        this.GruposUsuario=lista;
        this.GruposDisponibles=[];
        this.Grupos.forEach(g=>{
          var gr=this.GruposUsuario.filter(p=>p.id==g.id);
          if(gr.length<=0) {
            this.GruposDisponibles.push(g);
          }
        })
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de grupos del usuario',detalle:'No se ha podido obtener los grupos del usuario indicado'});
      });
    }

    OnCuandoAgregaUnGrupo(event:any) {
      var items=event.items?event.items.map((x:GrupoModel)=>x.id):[];
      this.admUsrServ.AgregarGruposUsuario(this.Usuario()?.id??"",items).subscribe({
        next:(exito)=>{
          if(exito) {
            this.msg.mensaje.set({tipo:'success',titulo:'Grupos permisos',detalle:'Grupos añadidos con éxito'})
          }
        },
        error:(error)=>{
           this.msg.mensaje.set({tipo:'error',titulo:'Grupos permisos',detalle:`Error al agregar grupos de permisos ${error}`});
        }
      });
    }

    OnCuandoQuitaGrupos(event:any) {
      var items=event.items?event.items.map((x:GrupoModel)=>x.id):[];
      this.admUsrServ.QuitarGruposUsuario(this.Usuario()?.id??"",items).subscribe({
        next:(exito)=>{
          if(exito) {
            this.msg.mensaje.set({tipo:'success',titulo:'Grupos permisos',detalle:'Grupos quitados con éxito'})
          }
        },
        error:(error)=>{
           this.msg.mensaje.set({tipo:'error',titulo:'Grupos permisos',detalle:`Error al quitar grupos de permisos ${error}`});
        }
      });
    }

    GetCredencialesUsuario() {
      this.admUsrServ.CredencialesUsuarioLista(this.Usuario()?.id??"").subscribe(lista=>{
        this.Credenciales=lista;
      },error=>{
        this.msg.mensaje.set({tipo:'error',titulo:'Listado de credenciales del usuario',detalle:'No se ha podido obtener las credenciales del usuario'});
      });
    }

    //Eventos de la parte de las credenciales
    OnCrearCredencial(event:Event) {
      this.confServ.confirm({
        target:event.target as EventTarget,
        message:`¿Desea crear una credencial del tipo seleccionado?`,
        header:`Crear credencial`,
        closable:false,
        closeOnEscape:false,
        icon:'pi pi-exclamation-triangle',
        rejectButtonProps:{
          label:'No',
          severity:'secondary',
          outlined:true
        },
        acceptButtonProps:{
          label:'Si',
          severity:'confirm',
          outlined:true
        },
        accept:()=>{

        }
      });
    }

    OnRevocarCredenciales(event:Event) {
      if(this.TipoCredencialSeleccionada==null) {
        this.msg.mensaje.set({tipo:"warm",titulo:"Tipo de crendencial",detalle:"Debe seleccionar un tipo de credencial para poder actuar"});
      } else {
        this.confServ.confirm({
          target:event.target as EventTarget,
          message:`¿Desea revocar las credenciales del usuario del tipo seleccionado?`,
          header:`Revocar credenciales`,
          closable:false,
          closeOnEscape:false,
          icon:'pi pi-exclamation-triangle',
          rejectButtonProps:{
            label:'No',
            severity:'secondary',
            outlined:true
          },
          acceptButtonProps:{
            label:'Si',
            severity:'confirm',
            outlined:true
          },
          accept:()=>{
            this.admUsrServ.RevocarTipoCrendencial(this.Usuario()?.id??"",this.TipoCredencialSeleccionada?.codigo??"").subscribe((credenciales)=>{
              if(credenciales>=0) {
                this.msg.mensaje.set({tipo:'info',titulo:`Revocadas ${credenciales} credenciales`,detalle:`Se han revocado ${credenciales} credenciales del tipo ${this.TipoCredencialSeleccionada?.nombre}`});
                this.GetCredencialesUsuario();
              }
            },
            error=>{
              this.msg.mensaje.set({tipo:'error',titulo:'Revocar credenciales del usuario',detalle:`Ha ocurrido un error al revocar las credenciales ${error.message}`});
            });
          }
        });
      }
    }
}
