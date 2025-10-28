import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapaymentsComponent } from './listapayments.component';

describe('ListapaymentsComponent', () => {
  let component: ListapaymentsComponent;
  let fixture: ComponentFixture<ListapaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
