import { Arrays } from '../util/Arrays';
import { Types } from '../util/Types';
import { BattlefieldRegion } from './BattlefieldRegion';
import { SkillTargetingMode } from './Skill';
import { Unit } from './Unit';
import { Targetable } from '../interfaces/Targetable';

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

    getTargetables(user: Unit, mode: SkillTargetingMode): Targetable[] {
        switch (mode) {
        case SkillTargetingMode.Self:
            return [user];
        case SkillTargetingMode.UnitMelee:
            return user.containingRegion!.units;
        case SkillTargetingMode.UnitArtillery:
            return this.getAllUnits().filter(unit => unit.containingRegion !== user.containingRegion);
        case SkillTargetingMode.UnitRanged:
            return this.getAllUnits();
        case SkillTargetingMode.RegionMelee:
            return [user.containingRegion!];
        case SkillTargetingMode.RegionAdjacent:
            {
                const index = this.regions.indexOf(user.containingRegion!);
                return this.regions.filter((_, i) => Math.abs(i - index) === 1);
            }
        case SkillTargetingMode.RegionArtillery:
            return this.regions.filter(region => region !== user.containingRegion);
        case SkillTargetingMode.RegionRanged:
            return this.regions;
        default:
            return Types.impossible(mode);
        }
    }

}
