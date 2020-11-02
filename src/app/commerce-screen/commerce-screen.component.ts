import { Component, OnInit } from '@angular/core';
import { City } from '../classes/City';
import { Resource } from '../classes/Resource';
import { UnitSpecies } from '../classes/UnitSpecies';
import { Game } from '../Game';
import { InventoryState } from '../state-trackers/InventoryState';
import { Objects } from '../util/Objects';

@Component({
    selector: 'app-commerce-screen',
    templateUrl: './commerce-screen.component.html',
    styleUrls: ['./commerce-screen.component.css']
})
export class CommerceScreenComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    city(): City {
        return Game.getMapState().city!;
    }

    inventory(): InventoryState {
        return Game.getInventoryState();
    }

    canBuy(resource: Resource, amount: number): boolean {
        if (!resource.forSale) {
            return false;
        }
        const price: number = this.city().getBuyPrice(resource) * amount;
        return this.inventory().credits >= price;
    }

    buy(resource: Resource, amount: number): void {
        const price: number = this.city().getBuyPrice(resource) * amount;
        this.inventory().removeCredits(price);
        this.inventory().addResource(resource, amount);
    }

    canBuySchematic(amount: number): boolean {
        return this.inventory().credits >= amount;
    }

    buySchematic(listing: [UnitSpecies, number]): void {
        this.inventory().removeCredits(listing[1]);
        this.inventory().addSchematic(listing[0]);
    }

    canSell(resource: Resource, amount: number): boolean {
        return this.inventory().resources.getAmount(resource) >= amount;
    }

    sell(resource: Resource, amount: number): void {
        const price: number = this.city().getSellPrice(resource) * amount;
        this.inventory().addCredits(price);
        this.inventory().removeResource(resource, amount);
    }

    resources(): Resource[] {
        return Objects.multitonValues(Resource).filter(x => x.forSale || Game.getInventoryState().resources.getAmount(x) > 0);
    }

    leave(): void {
        Game.returnToMap();
    }

}
