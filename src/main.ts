import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  providers:[
    //provideAnimations()
  ]
})
  .catch(err => console.error(err));
