import { Component, OnInit } from '@angular/core';
import { CreditsEntry } from '../classes/CreditsEntry';
import { Objects } from '../util/Objects';

@Component({
  selector: 'app-credits-page',
  templateUrl: './credits-page.component.html',
  styleUrls: ['./credits-page.component.css']
})
export class CreditsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  credits(): CreditsEntry[] {
      return Objects.multitonValues(CreditsEntry);
  }

}
