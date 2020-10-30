import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../Game';
import { InventoryState } from '../state-trackers/InventoryState';

@Component({
    selector: 'app-inventory-screen',
    templateUrl: './inventory-screen.component.html',
    styleUrls: ['./inventory-screen.component.css']
})
export class InventoryScreenComponent implements OnInit {

    inventory: InventoryState = new InventoryState();
    @Input() flex: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.inventory = Game.getInventoryState();
    }

}
