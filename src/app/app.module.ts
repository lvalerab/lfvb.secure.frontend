import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withInterceptorsFromDi, withInterceptors, withFetch } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PrincipalComponent } from './layout/principal/principal.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';

import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule} from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

//Interceptores de HTTP basados en clase (no en funciones)
import {httpInterceptorProviders} from './shared/interceptor/index';

//Otros modulos de la aplicacion
import {UsuarioModelModule} from './modules/usuario-model/usuario-model.module';

//Singleton para usar las variables signal en el authService
import { AuthService } from './shared/services/AuthService';
import { C404NotFoundComponentComponent } from './layout/c404-not-found-component/c404-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderComponent,    
    FooterComponent, 
    C404NotFoundComponentComponent,    
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MegaMenuModule,
    MenuModule,
    BreadcrumbModule,
    UsuarioModelModule,
    ToastModule
  ],
  providers: [
    //AuthService,
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      ripple:true,
      inputVariant:'filled',
      theme:{
        preset:Aura,
        options:{
          prefix:'p',
          darkModeSelector:'system',
          cssLayer:{
            name:'primeng',
            order:'primeng'
          }
        }
      },
      zIndex:{
        modal:99000,
        overlay:88000,
        menu:88000,
        tooltip:99000
      }
    }),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([]),
      withFetch()
    )
    ,httpInterceptorProviders,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
