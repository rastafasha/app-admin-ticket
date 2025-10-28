import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesEditComponent } from './calificaciones-edit.component';

describe('CalificacionesEditComponent', () => {
  let component: CalificacionesEditComponent;
  let fixture: ComponentFixture<CalificacionesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificacionesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
