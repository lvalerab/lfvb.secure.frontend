import { Component, NgZone, Input } from '@angular/core';
import { VariableSignal } from '@app/shared/utils/class/reactivo/VariableStateClass';
import { MegaMenuItem, MenuItem } from 'primeng/api';



@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  fecha:VariableSignal<string> = new VariableSignal<string>();

  @Input()
  menus:MegaMenuItem[]=[      
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
      },
      {
        label:"Blog",
        icon:"pi pi-fw pi-book",
        items:[]
      },
      {
        label:"Comunicaciones y Colaboración",
        icon:"pi pi-fw pi-address-book",
        items:[
          [
            {
              label:"Mensajería interna"
            },
          ]
        ]
      },
      {
        label:"Aplicaciones",
        icon:"pi pi-fw pi-android",
        items:[]
      },
      {
        label:"Proyectos",
        icon:"pi pi-fw pi-th-large",
        items:[]
      }
  ];

  @Input()
  navegacion:VariableSignal<MenuItem[]>=new VariableSignal<MenuItem[]>();
  
  @Input()
  home:VariableSignal<MenuItem> =new VariableSignal<MenuItem>();

  constructor(public zone:NgZone) {

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
