import { Skill } from './Skill';
import { UnitFaction } from '../interfaces/Unit';
import { Resource, ResourceDrop, ResourceInventory } from './Resource';
import { Status } from './Status';
import { Unit } from './Unit';

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', UnitFaction.Tank, Infinity, 2,
        [Skill.Move, Skill.Collect, Skill.Deconstruct, Skill.Arc, Skill.Siphon], []);

    // Drones
    public static readonly Stinger = new UnitSpecies('Stinger', UnitFaction.Drone, 1, 2, [Skill.Move, Skill.Sting, Skill.Collect], []);

    public static readonly Firebomb = new UnitSpecies('Firebomb', UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Detonate], [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0 }]);

    public static readonly Controller = new UnitSpecies('Controller', UnitFaction.Drone,
        1, 2, [Skill.Move, Skill.Hypnotize], [{ resource: Resource.Cordylith, min: 1, max: 1, chance: 0 }]);

    public static readonly Mister = new UnitSpecies('Mister', UnitFaction.Drone, 1, 2,
        [Skill.Move, Skill.Mist], [{resource: Resource.Nodule, min: 2, max: 2, chance: 0}, {resource: Resource.Gristle, min: 2, max: 2, chance: 0}]);

    public static readonly Gardener = new UnitSpecies('Gardener', UnitFaction.Drone, 4, 1,
        [Skill.Move, Skill.Prune], [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0 }, {resource: Resource.Nodule, min: 1, max: 1, chance: 0}]);

    public static readonly Debug = new UnitSpecies('Troubleshooter', UnitFaction.Drone, Infinity, Infinity, [Skill.Move,
        Skill.Decapitate, Skill.Meteor, Skill.Slash], []);

    // Creatures

    // Kill-Combo Series
    public static readonly Rat = new UnitSpecies('Rat', UnitFaction.Creature, 1, 1, [Skill.Move, Skill.Gnaw],
        [{ resource: Resource.Hide, min: 0, max: 1 }, { resource: Resource.Gristle, min: 0, max: 1 }]);

    public static readonly Tyger = new UnitSpecies('Tyger', UnitFaction.Creature, 3, 1, [Skill.Move, Skill.Maul],
        [{ resource: Resource.Hide, min: 3, max: 4 }, { resource: Resource.Gristle, min: 3, max: 4 }]);

    // Fire Series
    public static readonly Wyrm = new UnitSpecies('Wyrm', UnitFaction.Creature, 1, 3, [Skill.Burrow, Skill.Burn],
        [{ resource: Resource.Petranol, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Gristle, min: 1, max: 2, chance: 0.75 }]);

    public static readonly Drake = new UnitSpecies('Drake', UnitFaction.Creature, 3, 3, [Skill.FlamingWings, Skill.Burn],
        [{ resource: Resource.Petranol, min: 4, max: 6, chance: 0.75 }, { resource: Resource.Gristle, min: 3, max: 5, chance: 0.75 }, { resource: Resource.Cordylith, min: 0, max: 1, chance: 0.01}])

    // Armor Series
    public static readonly Isopod = new UnitSpecies('Isopod', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Prod],
        [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Hide, min: 2, max: 4, chance: 0.75 }], [Status.Armored]);

    public static readonly Barracuda = new UnitSpecies('Barracuda', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Slash],
        [{ resource: Resource.Aluminite, min: 4, max: 5, chance: 0.75 }, { resource: Resource.Hide, min: 4, max: 6, chance: 0.75 }], [Status.Armored]);

    // Corrosion Series
    public static readonly Crab = new UnitSpecies('Crab', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Corrode], [{ resource: Resource.Nodule, min: 0, max: 1, chance: 0.2 }, {resource: Resource.Silicate, min: 1, max: 2, chance: 0.75}]);

    public static readonly Lobster = new UnitSpecies('Lobster', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Pinch], [{ resource: Resource.Nodule, min: 0, max: 2, chance: 0.3 }, {resource: Resource.Silicate, min: 3, max: 5, chance: 0.75}]);

    // Bosses

    public static readonly Friday = new UnitSpecies('Friday', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.PhlegmaticShriek, Skill.Pinch], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, {resource: Resource.Silicate, min: 10, max: 20, chance: 1}, {resource: Resource.Nodule, min: 5, max: 10, chance: 1}], [Status.Boss]);

    // TODO: this should have a more interesting design
    public static readonly Mint = new UnitSpecies('Mint', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.Slash], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, { resource: Resource.Hide, min: 10, max: 20, chance: 1 }, { resource: Resource.Aluminite, min: 8, max: 16, chance: 1 }], [Status.Boss, Status.Armored, Status.Slippery]);


    // Deposits
    public static Clutch = UnitSpecies.createDepositSpecies('Clutch', 4, [{resource: Resource.Nodule, min: 3, max: 5}]);
    public static Well = UnitSpecies.createDepositSpecies('Well', 3, [{resource: Resource.Petranol, min: 2, max: 4}]);
    public static Coral = UnitSpecies.createDepositSpecies('Coral', 5, [{resource: Resource.Silicate, min: 2, max: 4}, {resource: Resource.Aluminite, min: 1, max: 3}], [Status.Armored]);
    public static Spire = UnitSpecies.createDepositSpecies('Spire', 6, [{resource: Resource.Cordylith, min: 2, max: 4}]);

    private constructor(public name: string, public faction: UnitFaction, public health: number,
        public actionsPerTurn: number, public skills: Skill[], public drops: ResourceDrop[], public statuses: Status[] = []) {}

    private static createDepositSpecies(name: string, health: number, drops: ResourceDrop[], statuses: Status[] = []): UnitSpecies {
        return new UnitSpecies(name, UnitFaction.Deposit, health, 0, [], drops, statuses);
    }

    get buildCost(): ResourceInventory {
        return ResourceInventory.fromAmounts(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    public instantiate(): Unit {
        return new Unit(this.name, this.faction, this.health, this.actionsPerTurn, this.skills, this.drops, this.statuses);
    }

}