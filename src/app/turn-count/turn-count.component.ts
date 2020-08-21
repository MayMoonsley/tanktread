import { Component, OnInit } from '@angular/core';
import { CombatStateService } from '../combat-state.service';
import { TurnCount } from '../interfaces/TurnCount';

@Component({
  selector: 'app-turn-count',
  templateUrl: './turn-count.component.html',
  styleUrls: ['./turn-count.component.css']
})
export class TurnCountComponent implements OnInit {

  count: TurnCount;

  constructor(private combatState: CombatStateService) { }

  ngOnInit(): void {
    this.count = this.combatState.getTurnCount();
  }

  array(n: number): number[] {
    return new Array(n);
  }

}
