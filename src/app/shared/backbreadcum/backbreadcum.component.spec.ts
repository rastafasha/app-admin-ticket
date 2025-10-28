import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackbreadcumComponent } from './backbreadcum.component';

describe('BackbreadcumComponent', () => {
    let component: BackbreadcumComponent;
    let fixture: ComponentFixture<BackbreadcumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BackbreadcumComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BackbreadcumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});