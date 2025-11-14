import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptoresComponent } from './subscriptores.component';

describe('SubscriptoresComponent', () => {
  let component: SubscriptoresComponent;
  let fixture: ComponentFixture<SubscriptoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
