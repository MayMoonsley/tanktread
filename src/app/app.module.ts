/* eslint-disable @typescript-eslint/no-extraneous-class */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnitComponent } from './unit/unit.component';
import { BattlefieldRegionComponent } from './battlefield-region/battlefield-region.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { CombatScreenComponent } from './combat-screen/combat-screen.component';
import { SkillComponent } from './skill/skill.component';
import { InventoryScreenComponent } from './inventory-screen/inventory-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        UnitComponent,
        BattlefieldRegionComponent,
        BattlefieldComponent,
        CombatScreenComponent,
        SkillComponent,
        InventoryScreenComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
