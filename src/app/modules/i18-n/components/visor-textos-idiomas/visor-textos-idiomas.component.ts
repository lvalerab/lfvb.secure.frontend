import { Component, Input, Output, WritableSignal, signal } from '@angular/core';
import { i18NService } from '@app/data/services/api/i18NService';
import { I18NGlobalService } from '../../services/I18NGlobalService';
import { ToastService } from '@app/shared/services/ToastService';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { toObservable } from '@angular/core/rxjs-interop';
import { TextoModel } from '@app/data/interfaces/i18N/Textos/TextoModel';
import { constantes } from 'src/const/constantes';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-visor-textos-idiomas',
  standalone: false,
  templateUrl: './visor-textos-idiomas.component.html',
  styleUrl: './visor-textos-idiomas.component.less',
})
export class VisorTextosIdiomasComponent {
  @Input()
  id:string|undefined;

  idiomas:IdiomaModel[]=[];

  texto:WritableSignal<TextoModel|undefined>=signal(undefined);
  idiomaSel:WritableSignal<IdiomaModel|undefined>=signal(undefined);
  textoMostrar:WritableSignal<SafeHtml|undefined>=signal(undefined);
  textoMostrar2:WritableSignal<SafeHtml|undefined>=signal(undefined);
  simple:WritableSignal<boolean>=signal(true);

  constructor(private i18nServ:i18NService,
              private i18Glb:I18NGlobalService,
              private msg:ToastService,
              private DOMSani:DomSanitizer
  ) {
    toObservable(this.idiomaSel).subscribe((idioma)=>{
      if(idioma!=null) {
        if(!idioma.multiple) {
          this.simple.set(true);
          let textos=this.texto()?.textos?.filter(t=>t.idioma?.codigo==idioma.codigo);
          if(textos && textos.length>0) {
            this.textoMostrar.set(this.DOMSani.bypassSecurityTrustHtml(textos[0].texto??""));
          } else {
            this.textoMostrar.set(`No se ha definido contenido para el idioma ${idioma.codigo} - ${idioma.nombre}`);
          }
        } else {
          this.simple.set(false);
          this.textoMostrar.set(this.DOMSani.bypassSecurityTrustHtml(this.texto()?.columnas?.columna1?.texto??""));
          this.textoMostrar2.set(this.DOMSani.bypassSecurityTrustHtml(this.texto()?.columnas?.columna2?.texto??""));
        }
      }
    });
  }

  ngOnInit() {
    this.GetTextos();
    this.GetIdiomas();
  }

  GetIdiomas() {
    this.i18nServ.Lista().subscribe({
      next:(valores)=>{
        this.idiomas=valores;
        let aux=this.idiomas.filter(i=>i.codigo==this.i18Glb.idioma()?.codigo);
        if(aux.length>0) {
          this.idiomaSel.set(aux[0]);
        }
      }
    })
  }

  GetTextos() {
    this.i18nServ.Texto(this.id??constantes.guid.zero).subscribe({
      next:(valor)=>{
        this.texto.set(valor);
      },
      error:(error)=>{
        this.msg.mensaje.set({tipo:"error",titulo:"Obtención del texto",detalle:`No se ha podido obtener el texto, causar: ${error.message}`})
      }
    })
  }
}
