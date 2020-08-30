import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../classes/Skill';
import { Unit } from '../classes/Unit';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  @Input() skill: Skill;
  @Input() unit: Unit;

  constructor() { }

  ngOnInit(): void {
  }

}
