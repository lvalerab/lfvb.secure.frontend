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
import { last } from 'rxjs';

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

  constructor(public zone:NgZone, 
              private AuthServ:AuthService, 
              private userApi:UsuarioApiService, 
              private propiedadesApi:PropiedadesApiService) {
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
    if(aplicaciones!=null && propiedades==null) {
      let parametro:ParametroElementosPropiedadesModel={
        idElementos:[],
        codigoPropiedad:["ICO_WEMEN","MEN_CONF","ANG_ROUTE","RAIZ_MENU"]
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
          label:"Inicio",
          icon:"pi pi-fw pi-home",
          routerLink:'/'
        }
      ];
      if(this.isValidUser()) {
       
        let menuAplicaciones:MenuItem[][]=[[]];
        let subMenuAplicaciones:MenuItem[]=[];
        let MenuConfiguracion:MenuItem[][]=[[]];
        let MenusConfiguracion:MenuItem[]=[];
        ///////////////////////////////////////////////////////////
        //Menu de aplicacion TODO:Obtener de la api
        ///////////////////////////////////////////////////////////

        if(aplicaciones!=null) {
          for(let i=0;i<aplicaciones.length;i++) {
            let icono:any=propiedades?.filter(x=>x.idElemento==aplicaciones[i].id && x.propiedad?.codigo=="ICO_WEMEN")[0];
            icono=icono && icono.valores?icono.valores[0].texto:'';
            let path:any=propiedades?.filter(x=>x.idElemento==aplicaciones[i].id && x.propiedad?.codigo=="ANG_ROUTE")[0];
            path=path && path.valores?path.valores[0].texto:'/';
            let raiz:any=propiedades?.filter(x=>x.idElemento==aplicaciones[i].id && x.propiedad?.codigo=="RAIZ_MENU")[0];
            raiz=raiz && raiz.valores?raiz.valores[0].bool:false;
            let conf:any=propiedades?.filter(x=>x.idElemento==aplicaciones[i].id && x.propiedad?.codigo=="MEN_CONF")[0];
            conf=conf && conf.valores?conf.valores[0].bool:false;
            let aux=(icono!=''?icono:"pi pi-fw pi-cog");
            if(!raiz) {
              if(!conf) {
                subMenuAplicaciones.push({
                  label:aplicaciones[i].nombre,
                  icon:aux+'',
                  routerLink:path
                })
              } else {
                MenusConfiguracion.push({
                  label:aplicaciones[i].nombre,
                  icon:aux+'',
                  routerLink:path
                });
              }
            } else {
              this.menus.push({
                label:aplicaciones[i].nombre,
                icon:aux+'',
                routerLink:path
              });
            }
          }
        }
        menuAplicaciones[0].push({
          label:"Del usuario",
          items:subMenuAplicaciones
        });
        //Menu de  aplicaciones
        this.menus.push( {
          label:"Aplicaciones",
          icon:"pi pi-fw pi-android",        
          items:menuAplicaciones
        });


        ///////////////////////////////////////////////////////////
        //Menu de configuracion TODO:Obtener de la api
        ///////////////////////////////////////////////////////////

        
        
        MenusConfiguracion.push({
          label:"Elementos",
          icon:'pi pi-fw pi-file',
          routerLink:'/elementos'
        });

        MenuConfiguracion[0].push({
          label:'Modulos',
          icon:'pi pi-fw pi-box',
          items:MenusConfiguracion
        });

        //Seguridad
        MenuConfiguracion[1]=[];
        MenuConfiguracion[1].push({
          label:'Seguridad',
          icon:'pi pi-fw pi-shield',
          items:[
            {
              label:"Usuarios",
              icon:'pi pi-fw pi-user',
              routerLink:'administracion/usuarios'
            },
            {
              label:"Grupos",
              icon:'pi pi-fw pi-users'
            },
          ]
        })

        this.menus.push({
          label:"Configuración",
          icon:"pi pi-fw pi-cog",        
          items:MenuConfiguracion
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
