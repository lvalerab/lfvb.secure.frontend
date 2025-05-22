import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastService } from './shared/services/ToastService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.less',
  providers:[MessageService]
})
export class AppComponent {
  title = 'LFVB Secure API Frontend';
  public constructor(private toast:ToastService, private msg:MessageService) {
    this.toast.obs.subscribe(mensaje=>{
      this.msg.add({severity:mensaje?.tipo,summary:mensaje?.titulo,detail:mensaje?.detalle});
    });
  }
}
