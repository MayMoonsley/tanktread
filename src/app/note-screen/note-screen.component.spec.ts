import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteScreenComponent } from './note-screen.component';

describe('NoteScreenComponent', () => {
  let component: NoteScreenComponent;
  let fixture: ComponentFixture<NoteScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
