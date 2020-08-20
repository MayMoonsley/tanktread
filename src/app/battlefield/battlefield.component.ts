import { Component, OnInit } from '@angular/core';
import { Battlefield } from '../interfaces/Battlefield';
import { BattlefieldService } from '../battlefield.service'

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

}
