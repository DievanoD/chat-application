import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesTestComponent } from './messages-test.component';

describe('MessagesTestComponent', () => {
  let component: MessagesTestComponent;
  let fixture: ComponentFixture<MessagesTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
