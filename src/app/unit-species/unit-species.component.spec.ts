import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSpeciesComponent } from './unit-species.component';

describe('UnitSpeciesComponent', () => {
  let component: UnitSpeciesComponent;
  let fixture: ComponentFixture<UnitSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
