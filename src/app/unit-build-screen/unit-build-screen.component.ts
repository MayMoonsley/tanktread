import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { InventoryState } from '../state-trackers/InventoryState';
import { UnitSpecies } from '../classes/Unit';
import { Game } from '../Game';
import { CombatState } from '../state-trackers/CombatState';

@Component({
    selector: 'app-unit-build-screen',
    templateUrl: './unit-build-screen.component.html',
    styleUrls: ['./unit-build-screen.component.css']
})
export class UnitBuildScreenComponent implements OnInit {

    inventory: InventoryState = new InventoryState();
    combat: CombatState = Game.getCombatState();

    constructor(private inventoryService: InventoryService) { }

    ngOnInit(): void {
        this.inventory = this.inventoryService.getInventory();
    }

    build(species: UnitSpecies): void {
        Game.build(species);
    }

}
