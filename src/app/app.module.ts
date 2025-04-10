import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

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
    BreadcrumbModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme:{
        preset:Aura,
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
