import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnitComponent } from './unit/unit.component';
import { BattlefieldRegionComponent } from './battlefield-region/battlefield-region.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    BattlefieldRegionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
