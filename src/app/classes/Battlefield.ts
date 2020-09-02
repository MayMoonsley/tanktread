import { Arrays } from '../util/Arrays';
import { Types } from '../util/Types';
import { BattlefieldRegion } from './BattlefieldRegion';
import { SkillTargetingMode } from './Skill';
import { Unit } from './Unit';

export class Battlefield {

    regions: BattlefieldRegion[];

    constructor(regions: BattlefieldRegion[]) {
        this.regions = regions;
    }

    moveUnit(unit: Unit, source: BattlefieldRegion, destination: BattlefieldRegion): void {
        if (!source.units.includes(unit)) {
            throw new Error('Can only remove unit from region it is in');
        }
        if (destination.units.includes(unit)) {
            throw new Error('Cannot move unit to region it is in');
        }
        source.removeUnit(unit);
        destination.addUnit(unit);
    }

    getAllUnits(): Unit[] {
        return Arrays.flatten(this.regions.map(region => region.units));
    }

    getTargetables(user: Unit, mode: SkillTargetingMode): (Unit | BattlefieldRegion)[] {
        switch (mode) {
            case SkillTargetingMode.UnitRanged:
                return this.getAllUnits();
            case SkillTargetingMode.UnitMelee:
                return user.containingRegion!.units;
            case SkillTargetingMode.Self:
                return [user];
            case SkillTargetingMode.Region:
                return this.regions;
            default:
                return Types.impossible(mode);
        }
    }

}
