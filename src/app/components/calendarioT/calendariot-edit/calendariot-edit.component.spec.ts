import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariotEditComponent } from './calendariot-edit.component';

describe('CalendariotEditComponent', () => {
  let component: CalendariotEditComponent;
  let fixture: ComponentFixture<CalendariotEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendariotEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendariotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
