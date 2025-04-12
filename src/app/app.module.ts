import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

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
import {MenuModule} from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';

//Interceptores de HTTP basados en clase (no en funciones)
import {httpInterceptorProviders} from './shared/interceptor/index';

//Otros modulos de la aplicacion
import {UsuarioModelModule} from './modules/usuario-model/usuario-model.module';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderComponent,    
    FooterComponent
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

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme:{
        preset:Material,
      }
    }),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([])
    )
    ,httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
