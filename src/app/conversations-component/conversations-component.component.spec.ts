import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsComponentComponent } from './conversations-component.component';

describe('ConversationsComponentComponent', () => {
  let component: ConversationsComponentComponent;
  let fixture: ComponentFixture<ConversationsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
