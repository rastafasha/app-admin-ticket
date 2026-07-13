import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListahijosComponent } from './listahijos.component';

describe('ListahijosComponent', () => {
  let component: ListahijosComponent;
  let fixture: ComponentFixture<ListahijosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListahijosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListahijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
