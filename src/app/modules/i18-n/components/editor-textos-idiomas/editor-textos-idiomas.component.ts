import { Component, Input, Output, WritableSignal, Signal, signal  } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { TextoModel } from '@app/data/interfaces/i18N/Textos/TextoModel';
import { i18NService } from '@app/data/services/api/i18NService';
import { ToastService } from '@app/shared/services/ToastService';
import { I18NGlobalService } from '../../services/I18NGlobalService';

@Component({
  selector: 'app-editor-textos-idiomas',
  standalone: false,
  templateUrl: './editor-textos-idiomas.component.html',
  styleUrl: './editor-textos-idiomas.component.less',
})
export class EditorTextosIdiomasComponent {
  @Input()
  titulo:string|undefined;

  @Input()
  texto:TextoModel|undefined|null;

  @Input()
  idiomaSel:WritableSignal<IdiomaModel|undefined|null>=signal(undefined);

  listaIdiomas:IdiomaModel[]=[];


  coltexto1:String="";
  coltexto2:string="";
  

  constructor(private i18Srv:i18NService,
              private i18Glb:I18NGlobalService,
              private msg:ToastService
  ) {

  }

  ngOnInit() {
    this.GetListaIdiomas();   
  }

  GetListaIdiomas() {
    this.i18Srv.ListaTodos().subscribe({
      next:(values)=>{
        this.listaIdiomas=values;
         if(this.idiomaSel()==null || this.idiomaSel()==undefined) {
          let aux=this.listaIdiomas.filter(i=>i.codigo==this.i18Glb.idioma()?.codigo);
          if(aux.length>0) {
            this.idiomaSel.set(aux[0]);
          }
        }
      },
      error:(error)=>this.msg.mensaje.set({tipo:'error',titulo:'Lista de idiomas',detalle:`No es posible obtener el listado completo de idiomas, causa ${error.message}`})
    })
  }
}
