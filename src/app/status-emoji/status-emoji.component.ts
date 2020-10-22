import { Component, OnInit, Input } from '@angular/core';
import { Status } from '../classes/Status';

@Component({
    selector: 'app-status-emoji',
    templateUrl: './status-emoji.component.html',
    styleUrls: ['./status-emoji.component.css']
})
export class StatusEmojiComponent implements OnInit {

    @Input() status: Status = Status.Fire;

    constructor() { }

    ngOnInit(): void {
    }

}
