import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVerifyComponent } from './ticket-verify.component';

describe('TicketVerifyComponent', () => {
  let component: TicketVerifyComponent;
  let fixture: ComponentFixture<TicketVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
