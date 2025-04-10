import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  
  menus:MegaMenuItem[] = [      
      {
        label:"Noticias",
        icon:"pi pi-fw pi-th-large",
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
        icon:"pi pi-fw pi-th-large",
        items:[]
      },
      {
        label:"Comunicaciones y Colaboración",
        icon:"pi pi-fw pi-th-large",
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
        icon:"pi pi-fw pi-th-large",
        items:[]
      },
      {
        label:"Proyectos",
        icon:"pi pi-fw pi-th-large",
        items:[]
      },
      {
        label:"Usuario",
        icon:"pi pi-fw pi-th-large",
        items:[
          [
            {
              label:"Perfil",
              icon:"pi pi-fw pi-th-large"
            },
            {
              label:"Configuración",
              icon:"pi pi-fw pi-th-large"
            },
            {
              label:"Cerrar sesión",
              icon:"pi pi-fw pi-th-large"
            }
          ]
        ]
      },
  ];

  navegacion:any[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/home'
    }
  ];
  home:any = {
    label:"Inicio"
  };

  constructor() {
    
  }
}
