import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldRegionComponent } from './battlefield-region.component';

describe('BattlefieldRegionComponent', () => {
    let component: BattlefieldRegionComponent;
    let fixture: ComponentFixture<BattlefieldRegionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BattlefieldRegionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BattlefieldRegionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
