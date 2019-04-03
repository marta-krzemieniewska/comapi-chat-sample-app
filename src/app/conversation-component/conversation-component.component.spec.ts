import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponentComponent } from './conversation-component.component';

describe('ConversationComponentComponent', () => {
  let component: ConversationComponentComponent;
  let fixture: ComponentFixture<ConversationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
