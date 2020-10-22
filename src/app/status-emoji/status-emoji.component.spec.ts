import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEmojiComponent } from './status-emoji.component';

describe('StatusEmojiComponent', () => {
  let component: StatusEmojiComponent;
  let fixture: ComponentFixture<StatusEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
