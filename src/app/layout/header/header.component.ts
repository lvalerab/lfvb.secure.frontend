import { Component, NgZone, Input, Signal, computed, effect } from '@angular/core';
import { VariableSignal } from '@app/shared/utils/class/reactivo/VariableStateClass';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AuthService } from '@shared/services/AuthService';
import { UsuarioApiService } from '@data/services/api/UsuarioApiService';
import { toObservable } from '@angular/core/rxjs-interop';
import { AplicacionModel } from '@app/data/interfaces/AplicacionModel';


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

  constructor(public zone:NgZone, private AuthServ:AuthService, private userApi:UsuarioApiService) {
    this.dibujarMenu(null);   
    this.obsIsValidUser.subscribe((value)=>{
      if(value) {
        this.userApi.Aplicaciones()
          .subscribe((aplicaciones)=>{
              this.dibujarMenu(aplicaciones);
          },(error)=>{
            console.error('Error al solicitar las aplicaciones del usuario',error);            
            this.dibujarMenu(null);    
          });
      } else {
        this.dibujarMenu(null);
      }      
    });
  }
 
  dibujarMenu(aplicaciones:AplicacionModel[] | null) {
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
          menuAplicaciones[0].push({
            label:aplicaciones[i].nombre
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
