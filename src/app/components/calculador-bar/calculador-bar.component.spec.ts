import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadorBarComponent } from './calculador-bar.component';

describe('CalculadorBarComponent', () => {
  let component: CalculadorBarComponent;
  let fixture: ComponentFixture<CalculadorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculadorBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
