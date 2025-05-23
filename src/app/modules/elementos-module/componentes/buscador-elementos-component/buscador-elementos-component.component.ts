import { Component,Output, Signal, computed, EventEmitter,WritableSignal,signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ElementoModel } from '@app/data/interfaces/ElementoModel';
import { AuthService } from '@app/shared/services/AuthService';
import { ToastService } from '@app/shared/services/ToastService';
import {UsuarioApiService} from '@data/services/api/UsuarioApiService';


@Component({
  selector: 'app-buscador-elementos-component',
  standalone: false,
  templateUrl: './buscador-elementos-component.component.html',
  styleUrl: './buscador-elementos-component.component.less'
})
export class BuscadorElementosComponentComponent {
  
    @Output() OnElementoSeleccionado=new EventEmitter<ElementoModel>();

    ElementoSeleccionado:ElementoModel|null=null;

    Elementos:Array<ElementoModel>=[];  
    ElementosFiltrados:WritableSignal<Array<ElementoModel>>=signal([]);  

    //Filtros
    FiltroCodigo:string|null=null;
    FiltroNombre:string|null=null;

    //Para controlar el cambio de usuario
    public isValidUser:Signal<boolean>=computed(()=>this.AuthServ.isAuthenticated());
    obsIsValidUser=toObservable(this.isValidUser);

    MsgError:string="";

    constructor(private apiPermisos:UsuarioApiService, private AuthServ:AuthService, private msg:ToastService) {}

    ngOnInit() {
      this.obsIsValidUser.subscribe((EsValido)=>{
        this.MsgError="";
        this.getElementosUsuario();
      },
      (error)=>{
        console.error("[VALIDAR USUARIO]",error);
        this.msg.mensaje.set({tipo:'error',titulo:'Validar el usuario',detalle:`Ha ocurrido un error al validar el usuario, causa: ${error}`});
        this.getElementosUsuario();
      });
      
    }

    getElementosUsuario():void {
      this.MsgError="";
      this.apiPermisos.Elementos().subscribe(e=>{
        this.Elementos=e;
        this.ElementosFiltrados.set(this.Elementos);
      },error=>{
        this.Elementos=[];
        this.ElementosFiltrados.set(this.Elementos);
        if(error.status==401) {
          this.msg.mensaje.set({tipo:'error',titulo:'Usuario sin permisos',detalle:`El usuario actual no tiene permisos`});
        }
        console.error("[LISTADO DE ELEMENTOS]",error);
      });
    }

    AplicaFiltro(valor:any, campo:any) {
      var filtrado=this.Elementos.filter(x=>(x.id??"").indexOf(this.FiltroCodigo??"")>=0 && (x.etiqueta??"").indexOf(this.FiltroNombre??"")>=0);
      this.ElementosFiltrados.set(filtrado);
    }

    CuandoSeleccionaFila(event:any)  {
      this.OnElementoSeleccionado.emit(event.data);
    }

    CambiaPagina(evento:any) {

    }
}
