import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Breadc2Component } from './breadc2.component';

describe('Breadc2Component', () => {
    let component: Breadc2Component;
    let fixture: ComponentFixture<Breadc2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Breadc2Component ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Breadc2Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});