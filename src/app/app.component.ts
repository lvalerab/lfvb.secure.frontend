import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from './shared/services/ToastService';
import { ConfirmService } from './shared/services/ConfirmService';
import { lab } from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.less',
  providers:[MessageService, ConfirmationService]
})
export class AppComponent {
  title = 'LFVB Secure API Frontend';
  public constructor(private toast:ToastService, 
                     private msg:MessageService,
                     private cnf:ConfirmationService,
                     private cnfS:ConfirmService) {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Observador de los mensajes TOAST                      
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.toast.obs.subscribe(mensaje=>{
      this.msg.add({severity:mensaje?.tipo,summary:mensaje?.titulo,detail:mensaje?.detalle});
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Observador de los mensajes de Confirmacion                      
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.cnfS.obs.subscribe(mensaje=>{
      if(mensaje) {
        this.cnf.confirm({
          target:mensaje.target??undefined,
          message:mensaje.mensaje,
          header:mensaje.titulo,
          icon:mensaje.icono,
          rejectLabel:mensaje.textoNo??"No",
          acceptLabel:mensaje.textoYes??"Si",
          rejectButtonProps:{
            label:mensaje.textoNo??"No",
            severity:mensaje.severityNo??'danger'
          },
          acceptButtonProps:{
            label:mensaje.textoYes??"Si",
            severity:mensaje.severityYes??'success'
          },
          accept:()=>{
            mensaje.funcionYes()
          },
          reject:()=>{
            mensaje.funcionNo();
          }
        });
      }
    });
  }
}
