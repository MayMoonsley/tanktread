import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { InventoryState } from '../state-trackers/InventoryState';

@Component({
    selector: 'app-inventory-screen',
    templateUrl: './inventory-screen.component.html',
    styleUrls: ['./inventory-screen.component.css']
})
export class InventoryScreenComponent implements OnInit {

    inventory: InventoryState = new InventoryState();

    constructor(private inventoryService: InventoryService) { }

    ngOnInit(): void {
        this.inventory = this.inventoryService.getInventory();
    }

}
