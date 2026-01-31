import { Component } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { error } from 'console';

@Component({
  selector: 'app-listado-idiomas',
  standalone: false,
  templateUrl: './listado-idiomas.component.html',
  styleUrl: './listado-idiomas.component.less',
})
export class ListadoIdiomasComponent {
  idiomas:IdiomaModel[]=[];

  constructor(private i18NServ:i18NService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {

  }

  GetListaIdiomas() {
    this.i18NServ.Lista().subscribe({
      next:(values)=>{
        this.idiomas=values;
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Obtencion de lista de idiomas",detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`});
      }
    });
  }
}
