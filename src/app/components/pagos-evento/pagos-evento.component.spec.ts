import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosEventoComponent } from './pagos-evento.component';

describe('PagosEventoComponent', () => {
  let component: PagosEventoComponent;
  let fixture: ComponentFixture<PagosEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
