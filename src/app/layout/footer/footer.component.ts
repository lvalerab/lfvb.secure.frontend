import { Component,computed,Signal } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { I18NGlobalService } from '@app/modules/i18-n/services/I18NGlobalService';
import { ToastService } from '@app/shared/services/ToastService';
import { AuthService } from '@shared/services/AuthService';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  public isValidUser:Signal<boolean>=computed(()=>this.authServ.isAuthenticated());
  public token:Signal<string|null>=computed(()=>this.authServ.token());
  usuario:Signal<UsuarioModel|null>=computed(()=>this.authServ.usuario());
  idioma:IdiomaModel|null=null;

  msgItemsNumber:Signal<number>=computed(()=>this.msg.indicePila());
  msgErrorItemsNumber:Signal<number>=computed(()=>this.msg.errores());
  msgWarnsItemsNumber:Signal<number>=computed(()=>this.msg.warnings());
  msgInfosItemsNumber:Signal<number>=computed(()=>this.msg.infos());
  constructor(private authServ:AuthService,
              private i18NGlbS:I18NGlobalService,
              private msg:ToastService
  ) {
    this.i18NGlbS.OnCambiaIdioma.subscribe(value=>{
      this.idioma=value;
    });
  }

}
