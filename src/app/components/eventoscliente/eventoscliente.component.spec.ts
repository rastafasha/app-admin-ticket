import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosclienteComponent } from './eventoscliente.component';

describe('EventosclienteComponent', () => {
  let component: EventosclienteComponent;
  let fixture: ComponentFixture<EventosclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
