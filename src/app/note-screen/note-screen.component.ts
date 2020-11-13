import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../classes/Note';
import { Game } from '../Game';

@Component({
    selector: 'app-note-screen',
    templateUrl: './note-screen.component.html',
    styleUrls: ['./note-screen.component.css']
})
export class NoteScreenComponent implements OnInit {

    @Input() note: Note = Note.Welcome;

    constructor() { }

    ngOnInit(): void {
    }

    hide(): void {
        Game.hideNote();
    }

}
