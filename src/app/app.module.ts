import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnitComponent } from './unit/unit.component';
import { BattlefieldRegionComponent } from './battlefield-region/battlefield-region.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { CombatScreenComponent } from './combat-screen/combat-screen.component';
import { TurnCountComponent } from './turn-count/turn-count.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitComponent,
    BattlefieldRegionComponent,
    BattlefieldComponent,
    CombatScreenComponent,
    TurnCountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
