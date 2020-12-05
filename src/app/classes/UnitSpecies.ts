import { Skill } from './Skill';
import { UnitFaction } from '../interfaces/Unit';
import { Resource, ResourceDrop, ResourceInventory } from './Resource';
import { Status } from './Status';
import { Unit } from './Unit';

export class UnitSpecies {

    // The Tank
    public static readonly Tank = new UnitSpecies('Tank', UnitFaction.Tank, Infinity, 3,
        [Skill.Move, Skill.Collect, Skill.Deconstruct], [], [], 5);

    // Drones
    // Starter drones
    public static readonly Stinger = UnitSpecies.drone('Stinger', 1, 2, 1, [Skill.Move, Skill.Sting, Skill.Collect]);
    public static readonly Scuttler = UnitSpecies.drone('Scuttler', 4, 2, 3, [Skill.Move, Skill.Slash, Skill.Collect]);

    // Self-Destructors
    public static readonly Firebomb = UnitSpecies.drone('Firebomb', 1, 2, 2, [Skill.Move, Skill.Detonate]);
    public static readonly Controller = UnitSpecies.drone('Controller', 1, 2, 8, [Skill.Move, Skill.Hypnotize]);
    public static readonly Mister = UnitSpecies.drone('Mister', 1, 2, 3, [Skill.Move, Skill.Mist]);

    // Immobile Drones
    public static readonly MiniFactory = UnitSpecies.drone('Mini-Factory', 5, 0, 10, [], [Status.Armored], 3);
    public static readonly ShieldGenerator = UnitSpecies.drone('Shield Generator', 5, 0, 10, [], [Status.Armored, Status.Projecting]);
    public static readonly Diffuser = UnitSpecies.drone('Diffuser', 5, 0, 10, [], [Status.Aromatic, Status.Armored]);

    // Deposit Synergies
    public static readonly Gardener = UnitSpecies.drone('Gardener', 4, 1, 2, [Skill.Move, Skill.Prune]);
    public static readonly Mulcher = UnitSpecies.drone('Mulcher', 4, 2, 3, [Skill.Move, Skill.Mulch]);

    // Charge Producers
    public static readonly Dynamo = UnitSpecies.drone('Dynamo', 7, 2, 6, [Skill.Move, Skill.Arc], [Status.Piezoelectric]);
    public static readonly Battery = UnitSpecies.drone('Battery', 1, 2, 3, [Skill.Move, Skill.Charge]);

    // Fire Synergies
    public static readonly Firefighter = UnitSpecies.drone('Firefighter', 4, 2, 6, [Skill.Move, Skill.Smother, Skill.Chop]);
    public static readonly Igniter = UnitSpecies.drone('Igniter', 3, 3, 4, [Skill.Move, Skill.Burn]);

    // Millenium Hall
    public static readonly Protector = UnitSpecies.drone('Protector', 2, 3, 4, [Skill.Move, Skill.Protect]);
    public static readonly Lifter = UnitSpecies.drone('Lifter', 3, 2, 3, [Skill.Move, Skill.Collect, Skill.Lift]);

    // Build Action Synergies
    public static readonly Gearhead = UnitSpecies.drone('Gearhead', 5, 2, 8, [Skill.Move, Skill.Repair, Skill.Deconstruct], [], 1);
    public static readonly Salvager = UnitSpecies.drone('Salvager', 5, 2, 10, [Skill.Move, Skill.Clobber, Skill.Repair]);

    public static readonly Debug = UnitSpecies.drone('Troubleshooter', Infinity, Infinity, 0, [Skill.Move,
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

    // Shield Series
    public static readonly Isopod = new UnitSpecies('Isopod', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Prod],
        [{ resource: Resource.Aluminite, min: 1, max: 3, chance: 0.75 }, { resource: Resource.Hide, min: 2, max: 4, chance: 0.75 }], [Status.Shield]);

    public static readonly Barracuda = new UnitSpecies('Barracuda', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Slash],
        [{ resource: Resource.Aluminite, min: 4, max: 5, chance: 0.75 }, { resource: Resource.Hide, min: 4, max: 6, chance: 0.75 }], [Status.Shield]);

    // Corrosion Series
    public static readonly Crab = new UnitSpecies('Crab', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Corrode], [{ resource: Resource.Nodule, min: 0, max: 1, chance: 0.2 }, {resource: Resource.Silicate, min: 1, max: 2, chance: 0.75}]);

    public static readonly Lobster = new UnitSpecies('Lobster', UnitFaction.Creature, 2, 1, [Skill.Move, Skill.Pinch], [{ resource: Resource.Nodule, min: 0, max: 2, chance: 0.3 }, {resource: Resource.Silicate, min: 3, max: 5, chance: 0.75}]);

    // Charged Series

    public static readonly Anemone = new UnitSpecies('Anemone', UnitFaction.Creature, 3, 1, [Skill.Electrify, Skill.Protect], [{ resource: Resource.Lithifer, min: 1, max: 2, chance: 0.2 }]);
    public static readonly Vermin = new UnitSpecies('Vermin', UnitFaction.Creature, 1, 3, [Skill.Burrow, Skill.Shock], [ { resource: Resource.Lithifer, min: 1, max: 2, chance: 0.2 } ]);

    // Bosses

    public static readonly Friday = new UnitSpecies('Friday', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.PhlegmaticShriek, Skill.Pinch, Skill.Spycheck], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, {resource: Resource.Silicate, min: 10, max: 20, chance: 1}, {resource: Resource.Nodule, min: 5, max: 10, chance: 1}], [Status.Boss]);

    // TODO: this should have a more interesting design
    public static readonly Mint = new UnitSpecies('Mint', UnitFaction.Creature, 10, 2, [Skill.Move, Skill.Slash, Skill.Spycheck], [{ resource: Resource.Fang, min: 1, max: 1, chance: 1 }, { resource: Resource.Hide, min: 10, max: 20, chance: 1 }, { resource: Resource.Aluminite, min: 8, max: 16, chance: 1 }], [Status.Boss, Status.Shield, Status.Slippery]);

    public static readonly Ember = new UnitSpecies('Ember', UnitFaction.Creature, 10, 2, [Skill.FlamingWings, Skill.Bite, Skill.Burn, Skill.Spycheck],
        [{resource: Resource.Fang, min: 1, max: 1, chance: 1}, { resource: Resource.Petranol, min: 15, max: 24, chance: 1 }, { resource: Resource.Gristle, min: 10, max: 14, chance: 1 }, { resource: Resource.Cordylith, min: 3, max: 3, chance: 1}],
        [Status.Boss]);

    public static readonly Magic = new UnitSpecies('Magic', UnitFaction.Creature, 10, 3, [Skill.Move, Skill.Shock, Skill.Protect, Skill.Spycheck], [{resource: Resource.Fang, min: 1, max: 1, chance: 1}, {resource: Resource.Lithifer, min: 10, max: 20, chance: 1}], [Status.Boss, Status.Piezoelectric]);

    public static readonly Charleston = new UnitSpecies('Charleston', UnitFaction.Creature, 10, 3, [Skill.Move, Skill.Maul], [ {resource: Resource.Fang, min: 1, max: 1, chance: 1}, { resource: Resource.Hide, min: 10, max: 30, chance: 1 }, { resource: Resource.Gristle, min: 10, max: 30, chance: 1 } ], [Status.Boss]);

    public static readonly Matriarch = new UnitSpecies('Matriarch', UnitFaction.Creature, 20, 3, [Skill.Divebomb, Skill.Buffet, Skill.Roost], [{resource: Resource.Heart, min: 1, max: 1, chance: 1}], [Status.Boss, Status.Avian]);

    public static readonly Egg = UnitSpecies.deposit('Egg', 3, [{resource: Resource.Amnion, min: 1, max: 1, chance: 0.5}], [Status.Armored, Status.Hatching]);

    public static readonly Larva = new UnitSpecies('Larva', UnitFaction.Creature, 3, 2, [Skill.Move, Skill.Gnaw], [{resource: Resource.Amnion, min: 1, max: 2, chance: 0.5}], []);

    // Deposits
    public static Clutch = UnitSpecies.deposit('Clutch', 4, [{resource: Resource.Nodule, min: 3, max: 5}]);
    public static Well = UnitSpecies.deposit('Well', 3, [{resource: Resource.Petranol, min: 2, max: 4}]);
    public static Coral = UnitSpecies.deposit('Coral', 5, [{resource: Resource.Silicate, min: 2, max: 4}, {resource: Resource.Aluminite, min: 1, max: 3}], [Status.Slippery]);
    public static Spire = UnitSpecies.deposit('Spire', 6, [{resource: Resource.Cordylith, min: 2, max: 4}]);
    public static Lodestone = UnitSpecies.deposit('Lodestone', 7, [{resource: Resource.Lithifer, min: 3, max: 5}], [Status.Slippery]);

    private constructor(public name: string, public faction: UnitFaction, public health: number,
        public actionsPerTurn: number, public skills: Skill[], public drops: ResourceDrop[],
        public statuses: Status[] = [], public buildPerTurn: number = 0) {}

    private static drone(name: string, health: number, actions: number, cost: number, skills: Skill[], statuses: Status[] = [], buildPerTurn: number = 0): UnitSpecies {
        return new UnitSpecies(name, UnitFaction.Drone, health, actions, skills,
            [{resource: Resource.Aluminite, min: cost, max: cost, chance: 0}], statuses, buildPerTurn);
    }

    private static deposit(name: string, health: number, drops: ResourceDrop[], statuses: Status[] = []): UnitSpecies {
        return new UnitSpecies(name, UnitFaction.Deposit, health, 0, [], drops, statuses);
    }

    get buildCost(): ResourceInventory {
        return ResourceInventory.fromAmounts(this.drops.map(item => { return { resource: item.resource, amount: item.max }; }));
    }

    get buildActionCost(): number {
        return this.drops.map(item => item.max).reduce((acc, x) => acc + x, 0);
    }

    public instantiate(): Unit {
        return new Unit(this.name, this.faction, this.health, this.actionsPerTurn, this.buildPerTurn, this.skills, this.drops, this.statuses);
    }

}