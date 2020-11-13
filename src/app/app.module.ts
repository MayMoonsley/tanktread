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
import { FormatInfinityPipe } from './format-infinity.pipe';
import { UnitBuildScreenComponent } from './unit-build-screen/unit-build-screen.component';
import { DefaultMessagePipe } from './default-message.pipe';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { CommerceScreenComponent } from './commerce-screen/commerce-screen.component';
import { UnitSpeciesComponent } from './unit-species/unit-species.component';
import { StatusEmojiComponent } from './status-emoji/status-emoji.component';
import { CreditsPageComponent } from './credits-page/credits-page.component';
import { TitleScreenComponent } from './title-screen/title-screen.component';

import { MarkdownModule } from 'ngx-markdown';
import { NoteScreenComponent } from './note-screen/note-screen.component';


@NgModule({
    declarations: [
        AppComponent,
        UnitComponent,
        BattlefieldRegionComponent,
        BattlefieldComponent,
        CombatScreenComponent,
        SkillComponent,
        InventoryScreenComponent,
        FormatInfinityPipe,
        UnitBuildScreenComponent,
        DefaultMessagePipe,
        MapScreenComponent,
        CommerceScreenComponent,
        UnitSpeciesComponent,
        StatusEmojiComponent,
        CreditsPageComponent,
        TitleScreenComponent,
        NoteScreenComponent
    ],
    imports: [
        BrowserModule,
        ButtonModule,
        AccordionModule,
        BrowserAnimationsModule,
        TooltipModule,
        MarkdownModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
