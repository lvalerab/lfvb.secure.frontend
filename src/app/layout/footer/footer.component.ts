import { Component,computed,Signal } from '@angular/core';
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
  constructor(private authServ:AuthService) {

  }

}
