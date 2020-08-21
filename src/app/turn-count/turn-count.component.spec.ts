import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnCountComponent } from './turn-count.component';

describe('TurnCountComponent', () => {
  let component: TurnCountComponent;
  let fixture: ComponentFixture<TurnCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
