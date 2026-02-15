import { Component, WritableSignal,signal, Input, Output } from '@angular/core';
import { IdiomaModel } from '@data/interfaces/i18N/IdiomaModel';
import { TextoModel } from '@data/interfaces/i18N/Textos/TextoModel';
import { i18NService } from '@data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { MenuItem } from 'primeng/api';
import { I18NGlobalService } from '../../services/I18NGlobalService';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-buscador-textos',
  standalone: false,
  templateUrl: './buscador-textos.component.html',
  styleUrl: './buscador-textos.component.less',
})
export class BuscadorTextosComponent {

    @Input()
    titulo:string="Busqueda de textos";

    @Input()
    seleccion:boolean=false;

    //@Output() onCuandoSeleccionaTexto=new EventEmitter<any>();

    opciones:WritableSignal<MenuItem[]|undefined>=signal(undefined);

    idiomas:IdiomaModel[]=[];

    idiomasFiltro:IdiomaModel[]=[];
    textoFiltro:string="";

    idiomasMostrados:IdiomaModel[]=[];

    resultado:TextoModel[]=[];

    constructor(private i18nServ:i18NService,
                private i18nGlb:I18NGlobalService,
                private msg:ToastService
    ) {

    }

    ngOnInit() {
      this.GetListaIdiomas();
    }

    GetListaIdiomas() {
      this.i18nServ.ListaTodos().subscribe({
        next:(values)=>{
          this.idiomas=values;
          this.idiomasMostrados=this.idiomas.filter(id=>id.codigo==this.i18nGlb.idioma()?.codigo);
          this.idiomasFiltro=this.idiomas.filter(id=>id.codigo==this.i18nGlb.idioma()?.codigo);
         },
        error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Lista de idiomas',detalle:`No se ha podido obtener el listado de idiomas, causa: ${error.message}`})
      })
    }

    GetTexto(codIdio:string,texto:TextoModel):string {
      return "";
    }
}
