import { Component,computed,Signal } from '@angular/core';
import { IdiomaModel } from '@app/data/interfaces/i18N/IdiomaModel';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { I18NGlobalService } from '@app/modules/i18-n/services/I18NGlobalService';
import { AuthService } from '@shared/services/AuthService';

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
  constructor(private authServ:AuthService,
              private i18NGlbS:I18NGlobalService
  ) {
    this.i18NGlbS.OnCambiaIdioma.subscribe(value=>{
      this.idioma=value;
    });
  }

}
