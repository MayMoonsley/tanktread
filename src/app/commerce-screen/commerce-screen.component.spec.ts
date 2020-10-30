import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceScreenComponent } from './commerce-screen.component';

describe('CommerceScreenComponent', () => {
  let component: CommerceScreenComponent;
  let fixture: ComponentFixture<CommerceScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
