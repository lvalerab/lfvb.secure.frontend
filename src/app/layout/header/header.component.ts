import { Component, NgZone, Input, Signal, computed, effect } from '@angular/core';
import { VariableSignal } from '@app/shared/utils/class/reactivo/VariableStateClass';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from '@shared/services/AuthService';
import { UsuarioApiService } from '@data/services/api/UsuarioApiService';
import { PropiedadesApiService } from '@data/services/api/PropiedadesApiService';
import { toObservable } from '@angular/core/rxjs-interop';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';
import { PropiedadElementoModel } from '@data/interfaces/PropiedadElementoModel';
import {ParametroElementosPropiedadesModel} from '@data/interfaces/ParametroElementosPropiedadesModel';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  fecha:VariableSignal<string> = new VariableSignal<string>();
  public isValidUser:Signal<boolean>=computed(()=>this.AuthServ.isAuthenticated());
  obsIsValidUser=toObservable(this.isValidUser);
  @Input()
  public menus:MegaMenuItem[]=[];
  @Input()
  navegacion:VariableSignal<MenuItem[]>=new VariableSignal<MenuItem[]>();
  
  @Input()
  home:VariableSignal<MenuItem> =new VariableSignal<MenuItem>();

  constructor(public zone:NgZone, private AuthServ:AuthService, private userApi:UsuarioApiService, private propiedadesApi:PropiedadesApiService) {
    this.dibujarMenu(null,null);   
    this.obsIsValidUser.subscribe((value)=>{
      if(value) {
        this.userApi.Aplicaciones()
          .subscribe((aplicaciones)=>{
              this.dibujarMenu(aplicaciones,null);
          },(error)=>{
            console.error('Error al solicitar las aplicaciones del usuario',error);            
            this.dibujarMenu(null,null);    
          });
      } else {
        this.dibujarMenu(null,null);
      }      
    });
  }
 
  dibujarMenu(aplicaciones:AplicacionModel[] | null, propiedades:PropiedadElementoModel[] |null) {
    debugger;
    if(aplicaciones!=null && propiedades==null) {
      let parametro:ParametroElementosPropiedadesModel={
        idElementos:[],
        codigoPropiedad:["ICO_WEMEN"]
      };
      for(let p in aplicaciones) {
        parametro.idElementos.push(aplicaciones[p].id)
      };
      this.propiedadesApi.ConsultaPropiedadesElementos(parametro).subscribe((resultado:PropiedadElementoModel[])=>{
        this.dibujarMenu(aplicaciones,resultado);
      },(error:any)=>{
        console.error("Error al consultar las propiedades de las aplicaciones",error);
      });
    } else {
      this.menus=[
        {
          label:"Noticias",
          icon:"pi pi-fw pi-list",
          items:[
            [
              {
                label:"Últimas noticias",
                icon:"pi pi-fw pi-th-large"
              },
              {
                label:"Buscar noticias",
                icon:"pi pi-fw pi-th-large"
              },          
            ]
          ]
        }
      ];
      if(this.isValidUser()) {
        //Menu del blog
        this.menus.push({
          label:"Blog",
          icon:"pi pi-fw pi-book",        
          items:[]
        });
        //Menu de comunicaciones
        this.menus.push({
          label:"Comunicaciones y Colaboración",
          icon:"pi pi-fw pi-address-book",        
          items:[
            [
              {
                label:"Mensajería interna"
              },
            ]
          ]
        });
        let menuAplicaciones:MenuItem[][]=[[]];

        if(aplicaciones!=null) {
          for(let i=0;i<aplicaciones.length;i++) {
            let icono=propiedades?.filter(x=>x.idElemento==aplicaciones[i].id)[0];
            let aux=(icono && icono.valores?icono.valores[0].texto:"pi pi-fw pi-cog");
            menuAplicaciones[0].push({
              label:aplicaciones[i].nombre,
              icon:aux+''
            })
          }
        }
        //Menu de  aplicaciones
        this.menus.push( {
          label:"Aplicaciones",
          icon:"pi pi-fw pi-android",        
          items:menuAplicaciones
        });
        //Menus de proyectos
        this.menus.push( {
          label:"Proyectos",        
          icon:"pi pi-fw pi-th-large",
          items:[]
        });
      };
    };
  }

  ngOnInit() {
    this.home.set({label:"Inicio", icon:"pi pi-fw pi-home", routerLink:"/"});
    this.navegacion.set([]);
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.SetHora();
      }, 1000); // Actualiza la hora cada segundo
    });
  }

  async SetHora(){
    this.fecha.set(new Date().toLocaleString("es-ES"));
  }
}
