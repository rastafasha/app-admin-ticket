import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEditComponent } from './cat-edit.component';

describe('CatEditComponent', () => {
  let component: CatEditComponent;
  let fixture: ComponentFixture<CatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
