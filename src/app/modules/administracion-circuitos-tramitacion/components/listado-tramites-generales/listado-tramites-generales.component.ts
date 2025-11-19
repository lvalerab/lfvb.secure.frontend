import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramiteModel } from '@app/data/interfaces/Circuitos/TramiteModel';
import { AdministracionCircuitosTramitacionService } from '@app/data/services/api/AdministracionCircuitosTramitacionService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-listado-tramites-generales',
  standalone: false,
  templateUrl: './listado-tramites-generales.component.html',
  styleUrl: './listado-tramites-generales.component.less'
})
export class ListadoTramitesGeneralesComponent {
  tramites:TramiteModel[]=[];
  tramitesFiltro:TramiteModel[]=[];

  opciones:MenuItem[]=[];
  
  constructor(private circService:AdministracionCircuitosTramitacionService,
              private msg:ToastService,
              private route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.ObtenerListaTramites();
    this.GetOpcionesTramites();
  }

  GetOpcionesTramites() {
    this.opciones.push({
        icon:'pi pi-plus',
        label:'Nuevo tramite',
        routerLink:'/circuitos/administracion/tramite/nuevo'
    });
  }


  ObtenerListaTramites() {
    this.circService.ListaTramites().subscribe((resultado)=>{
      this.tramites=resultado;
      this.tramitesFiltro=resultado;
      if(resultado.length<=0) {
        this.msg.mensaje.set({
          tipo:'warning',
          titulo:'Listado de tramites',
          detalle:'No se ha configurado ningun trámite aun, debe dar de alta al menos uno'
        });
      }
    },
    error=>{
      this.msg.mensaje.set({
        tipo:'error',
        titulo:'Listado de tramites',
        detalle:`Error al obtener los tramites, causa: ${error.message}`
      });
    });
  }
}
