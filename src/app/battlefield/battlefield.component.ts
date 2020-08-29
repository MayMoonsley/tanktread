import { Component, OnInit } from '@angular/core';
import { Battlefield } from '../classes/Battlefield';
import { BattlefieldService } from '../battlefield.service'
import { Game } from '../Game';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  battlefield: Battlefield;

  constructor(private battlefieldService: BattlefieldService) {}

  ngOnInit(): void {
    this.battlefield = this.battlefieldService.getBattlefield();
  }

  hurtEveryone(): void {
    Game.hurtEveryone();
  }

  hurtSomeone(): void {
    Game.hurtSomeone();
  }

}
