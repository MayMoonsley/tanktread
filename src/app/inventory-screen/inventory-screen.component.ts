import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../Game';
import { InventoryState } from '../state-trackers/InventoryState';
import { Note } from '../classes/Note';
import { Objects } from '../util/Objects';

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

    notes(): Note[] {
        return Objects.multitonValues(Note).filter(note => note.available);
    }

    view(note: Note): void {
        Game.viewNote(note);
    }

}
