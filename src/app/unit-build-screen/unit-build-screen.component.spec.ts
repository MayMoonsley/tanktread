import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBuildScreenComponent } from './unit-build-screen.component';

describe('UnitBuildScreenComponent', () => {
    let component: UnitBuildScreenComponent;
    let fixture: ComponentFixture<UnitBuildScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnitBuildScreenComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitBuildScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
