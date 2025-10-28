import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailparentComponent } from './detailparent.component';

describe('DetailparentComponent', () => {
  let component: DetailparentComponent;
  let fixture: ComponentFixture<DetailparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
