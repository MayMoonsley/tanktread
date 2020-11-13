import { Skill } from './Skill';
import { UnitFaction } from '../interfaces/Unit';
import { Resource, ResourceDrop, ResourceInventory } from './Resource';
import { Status } from './Status';
import { Unit } from './Unit';

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', UnitFaction.Tank, Infinity, 2,
        [Skill.Move, Skill.Collect, Skill.Deconstruct], []);

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

    public static readonly Mulcher = new UnitSpecies('Mulcher', UnitFaction.Drone, 4, 2, [Skill.Move, Skill.Mulch, Skill.Transfer], [{resource: Resource.Aluminite, min: 1, max: 1, chance: 0}, {resource: Resource.Lithifer, min: 1, max: 1, chance: 0}, {resource: Resource.Nodule, min: 1, max: 1, chance: 0}]);

    public static readonly Dynamo = new UnitSpecies('Dynamo', UnitFaction.Drone, 5, 1, [Skill.Move, Skill.Arc],
        [{resource: Resource.Lithifer, min: 2, max: 2, chance: 0}, {resource: Resource.Hide, min: 4, max: 4, chance: 0}], [Status.Piezoelectric]);

    public static readonly Protector = new UnitSpecies('Protector', UnitFaction.Drone, 2, 3, [Skill.Move, Skill.Protect],
        [{resource: Resource.Cordylith, min: 2, max: 2, chance: 0}, {resource: Resource.Silicate, min: 4, max: 4, chance: 0}]);

    public static readonly Battery = new UnitSpecies('Battery', UnitFaction.Drone, 1, 2, [Skill.Move, Skill.Charge],
        [{resource: Resource.Lithifer, min: 1, max: 1, chance: 0}]);

    public static readonly Firefighter = new UnitSpecies('Firefighter', UnitFaction.Drone, 4, 2, [Skill.Move, Skill.Smother, Skill.Chop], [{resource: Resource.Aluminite, min: 3, max: 3}, {resource: Resource.Silicate, min: 3, max: 3}]);

    public static readonly Igniter = new UnitSpecies('Igniter', UnitFaction.Drone, 3, 3, [Skill.Move, Skill.Burn], [{resource: Resource.Petranol, min: 3, max: 3, chance: 0}, {resource: Resource.Aluminite, min: 2, max: 2, chance: 0}]);

    public static readonly Lifter = new UnitSpecies('Lifter', UnitFaction.Drone, 3, 2, [Skill.Move, Skill.Collect, Skill.Lift], [{resource: Resource.Aluminite, min: 4, max: 4, chance: 0}, {resource: Resource.Gristle, min: 1, max: 1, chance: 0}]);

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

    public static readonly Drake = new UnitSpecies('Drake', UnitFaction.Creature, 3, 3, [Skill.Move, Skill.Bite],
        [{ resource: Resource.Petranol, min: 4, max: 6, chance: 0.75 }, { resource: Resource.Gristle, min: 3, max: 5, chance: 0.75 }, { resource: Resource.Cordylith, min: 0, max: 1, chance: 0.01}])

    // Armor Series
    public static readonly Isopod = new UnitSpecies('Isopod', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Prod],
        [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Hide, min: 2, max: 4, chance: 0.75 }], [Status.Armored]);

    public static readonly Barracuda = new UnitSpecies('Barracuda', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Slash],
        [{ resource: Resource.Aluminite, min: 4, max: 5, chance: 0.75 }, { resource: Resource.Hide, min: 4, max: 6, chance: 0.75 }], [Status.Armored]);

    // Corrosion Series
    public static readonly Crab = new UnitSpecies('Crab', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Corrode], [{ resource: Resource.Nodule, min: 0, max: 1, chance: 0.2 }, {resource: Resource.Silicate, min: 1, max: 2, chance: 0.75}]);

    public static readonly Lobster = new UnitSpecies('Lobster', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Pinch], [{ resource: Resource.Nodule, min: 0, max: 2, chance: 0.3 }, {resource: Resource.Silicate, min: 3, max: 5, chance: 0.75}]);

    // Charged Series

    public static readonly Anemone = new UnitSpecies('Anemone', UnitFaction.Creature, 3, 1, [Skill.Electrify, Skill.Protect], [{ resource: Resource.Lithifer, min: 1, max: 2, chance: 0.2 }]);
    public static readonly Vermin = new UnitSpecies('Vermin', UnitFaction.Creature, 1, 3, [Skill.Burrow, Skill.Shock], [ { resource: Resource.Lithifer, min: 1, max: 2, chance: 0.2 } ]);

    // Bosses

    public static readonly Friday = new UnitSpecies('Friday', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.PhlegmaticShriek, Skill.Pinch, Skill.Spycheck], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, {resource: Resource.Silicate, min: 10, max: 20, chance: 1}, {resource: Resource.Nodule, min: 5, max: 10, chance: 1}], [Status.Boss]);

    // TODO: this should have a more interesting design
    public static readonly Mint = new UnitSpecies('Mint', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.Slash, Skill.Spycheck], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, { resource: Resource.Hide, min: 10, max: 20, chance: 1 }, { resource: Resource.Aluminite, min: 8, max: 16, chance: 1 }], [Status.Boss, Status.Armored, Status.Slippery]);

    public static readonly Ember = new UnitSpecies('Ember', UnitFaction.Creature, 10, 2, [Skill.FlamingWings, Skill.Bite, Skill.Burn, Skill.Spycheck],
        [{resource: Resource.Fang, min: 1, max: 1, chance: 1}, { resource: Resource.Petranol, min: 15, max: 24, chance: 1 }, { resource: Resource.Gristle, min: 10, max: 14, chance: 1 }, { resource: Resource.Cordylith, min: 3, max: 3, chance: 1}],
        [Status.Boss]);

    public static readonly Magic = new UnitSpecies('Magic', UnitFaction.Creature, 10, 3, [Skill.Move, Skill.Shock, Skill.Protect, Skill.Spycheck], [{resource: Resource.Fang, min: 1, max: 1, chance: 1}, {resource: Resource.Lithifer, min: 10, max: 20, chance: 1}], [Status.Boss, Status.Piezoelectric]);

    public static readonly Charleston = new UnitSpecies('Charleston', UnitFaction.Creature, 10, 3, [Skill.Move, Skill.Maul], [ {resource: Resource.Fang, min: 1, max: 1, chance: 1}, { resource: Resource.Hide, min: 10, max: 30, chance: 1 }, { resource: Resource.Gristle, min: 10, max: 30, chance: 1 } ], [Status.Boss]);

    // Deposits
    public static Clutch = UnitSpecies.createDepositSpecies('Clutch', 4, [{resource: Resource.Nodule, min: 3, max: 5}]);
    public static Well = UnitSpecies.createDepositSpecies('Well', 3, [{resource: Resource.Petranol, min: 2, max: 4}]);
    public static Coral = UnitSpecies.createDepositSpecies('Coral', 5, [{resource: Resource.Silicate, min: 2, max: 4}, {resource: Resource.Aluminite, min: 1, max: 3}], [Status.Armored]);
    public static Spire = UnitSpecies.createDepositSpecies('Spire', 6, [{resource: Resource.Cordylith, min: 2, max: 4}]);
    public static Lodestone = UnitSpecies.createDepositSpecies('Lodestone', 7, [{resource: Resource.Lithifer, min: 3, max: 5}], [Status.Armored]);

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