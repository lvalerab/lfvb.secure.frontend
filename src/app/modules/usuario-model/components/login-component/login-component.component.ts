import { Component,Input, Output, ViewChild, ElementRef, Renderer2, computed, Signal, WritableSignal, signal } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '@app/shared/services/ToastService';
import { ModalLoginComponentComponent } from '../modal-login-component/modal-login-component.component';
import { UsuarioModel } from '@app/data/interfaces/UsuarioModel';
import { AuthService} from '@shared/services/AuthService';
import { ModalUsuarioActualComponent} from '../modal-usuario-actual/modal-usuario-actual.component';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { PropiedadesApiService } from '@app/data/services/api/PropiedadesApiService';


@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.less',
  providers:[DialogService]
})
export class LoginComponentComponent {


  

  public OpcionesUsuario:MenuItem[]=[];
  _MenuMostrado:boolean=false;

  refDlg:DynamicDialogRef | undefined;


  public usuarioValido:Signal<boolean>=computed(()=>this.autServ.isAuthenticated());
  public usuario:Signal<UsuarioModel|null>=computed(()=>this.autServ.usuario());
  
  public imgAvatar:WritableSignal<string>=signal("");  

  public OnCambiaUsuarioValido=toObservable(this.usuario).subscribe((usuario)=>this.CuandoCambiaUsuario(usuario));

  constructor(private dlg:DialogService, 
              private msg:ToastService, 
              private autServ:AuthService,
              private propServ:PropiedadesApiService) {
    this.refDlg=undefined;
  }

  NgOnInit() {
    
  }

  ObtenAvatarUsuario() {
    if(this.usuarioValido()) {
      this.propServ.ConsultaPropiedadesElementos({
        idElementos:[this.usuario()?.id??""],
        codigoPropiedad:["IMG_USER","RIMG_USER"]
      }).subscribe({
        next:(data)=> {
          debugger;
          for(let i=0;i<data.length;i++) {
            if(data[i].valores!=null && (data[i].valores??[]).length>0) {
              let elem=(data[i].valores??[])[0];
              this.imgAvatar.set(elem?.texto??"");
            } 
          }
        }
      });
    }
  }

  MuestraOpcionesLogin() {
    console.log("Pincha al menu");
    console.log(`Usuario valido: ${this.usuarioValido()}`);
    console.log(`Usuario valido: ${computed(()=>this.autServ.isAuthenticated())()}`);
    console.log(`token desde fuera ${this.autServ.token()}`);
    
    this._MenuMostrado=!this._MenuMostrado;    
    if((!this.autServ.useSignal && this.autServ.isAuthenticated()) || (this.autServ.useSignal && this.usuarioValido())) {
      this.OpcionesUsuario=[
         {
          label:"Ficha usuario actual",
          icon: PrimeIcons.USER_EDIT,
          command:()=>{
            this.MuestraDialogoDatosUsuario();
          }
        },
        {
          separator:true
        },
        {
          label:"Log out",
          icon: PrimeIcons.LOCK,
          command:()=>{
            this.autServ.logout();
            this.msg.mensaje.set({tipo:'success',titulo:'Logout',detalle:'El usuario ha cerrado sesión con éxito'});
          }
        }
      ];
    } else {
      this.OpcionesUsuario=[
        {
          label:"Log in",
          icon: PrimeIcons.LOCK_OPEN,
          command:()=>{
            this.MuestraDialogoValidarUsuario();
          }
        },
        {
          separator:true
        },
        {
          label:"Solicitud de registro",
          icon: PrimeIcons.DATABASE
        }
      ];
    }    
  }

  CuandoCambiaUsuario(user:UsuarioModel|null) {
      if(user?.id) {
        this.ObtenAvatarUsuario();
      } else {
        this.imgAvatar.set("");
      }
  }

  MuestraDialogoValidarUsuario() {
    this.refDlg=this.dlg.open(ModalLoginComponentComponent,{
      header:'Validar usuario', 
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body'
    });

    this.refDlg.onClose.subscribe((data:any)=>{
      if(data!=null) {
        this.msg.mensaje.set({tipo:'success',titulo:'Login', detalle:`Se ha validado con éxito`});
        this.refDlg?.destroy();
      } else {       
        this.refDlg?.destroy();
      }
    });
  }

  MuestraDialogoDatosUsuario() {
    this.dlg.open(ModalUsuarioActualComponent,{
      header:'Datos usuario', 
      closable:true,
      modal:true,
      width:'50vm',
      contentStyle:{overflow:'auto'},
      appendTo:'body'
    });
  }
}
