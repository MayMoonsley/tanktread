import { Battlefield } from './classes/Battlefield';
import { GameMode, GameState } from './state-trackers/GameState';
import { InventoryState } from './state-trackers/InventoryState';
import { CombatState } from './state-trackers/CombatState';
import { MapState } from './state-trackers/MapState';
import { Unit } from './classes/Unit';
import { UnitSpecies } from './classes/UnitSpecies';
import { BattlefieldRegion } from './classes/BattlefieldRegion';
import { Random } from './util/Random';
import { Skill } from './classes/Skill';
import { Targetable } from './interfaces/Targetable';
import { Note } from './classes/Note';
import { City } from './classes/City';
import { Biome } from './classes/MapTile';
import { UnitFaction } from './interfaces/Unit';
import { Promises } from './util/Promises';

interface TargetingState {
    active: boolean;
    user?: Unit;
    skill?: Skill;
    targetables: Targetable[];
    target?: Targetable;
}

export namespace Game {

    let currentTargetingState: TargetingState = {
        active: false,
        user: undefined,
        skill: undefined,
        targetables: []
    };

    function initialCombatState(map: MapState): CombatState {
        const regionNames = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];
        const tank = UnitSpecies.Tank.instantiate();
        const enemySpecies = [UnitSpecies.Rat, UnitSpecies.Wyrm];
        const battlefield = new Battlefield([]);
        for (const name of regionNames) {
            const region = new BattlefieldRegion(name);
            for (let i = 0; i < 1; i++) {
                region.addUnit(Random.fromArray(enemySpecies).instantiate());
            }
            battlefield.regions.push(region);
        }
        battlefield.regions = Random.shuffle(battlefield.regions);
        battlefield.regions[0].addUnit(tank);
        return new CombatState(tank, battlefield, map);
    }

    function initialState(): GameState {
        const map = new MapState();
        const inv = new InventoryState();
        const combat = initialCombatState(map);
        return new GameState(GameMode.Map, combat, inv, map);
    }

    let currentState = initialState();

    export function newGame(): void {
        currentState = initialState();
    }

    export function getMode(): GameMode {
        return currentState.mode;
    }

    export function getBattlefield(): Battlefield {
        return currentState.combat.battlefield;
    }

    export function getInventoryState(): InventoryState {
        return currentState.inventory;
    }

    export function getCombatState(): CombatState {
        return currentState.combat;
    }

    export function getMapState(): MapState {
        return currentState.map;
    }

    export function getTargetables(): Targetable[] {
        if (currentTargetingState.active) {
            return currentTargetingState.targetables;
        }
        return [];
    }

    export function isEnemyTurn(): boolean {
        return currentState.combat.isEnemyTurn;
    }

    export function enterCity(city: City): void {
        currentState.map.city = city;
        currentState.mode = GameMode.Town;
    }

    export function enterBiome(biome: Biome, boss: boolean = false): void {
        currentState.map.exploreRegion(biome, 2);
        enterCombat(biome.generateBattlefield(boss));
    }

    export function enterCombat(battlefield: Battlefield): void {
        const tank = UnitSpecies.Tank.instantiate();
        battlefield.regions[0].addUnit(tank);
        currentState.combat = new CombatState(tank, battlefield, currentState.map);
        currentState.mode = GameMode.Battle;
    }

    export function returnToMap(): void {
        currentState.mode = GameMode.Map;
    }

    export function packUp(): void {
        const drones = currentState.combat.battlefield.getAllUnitsOfFaction(UnitFaction.Drone);
        for (let drone of drones) {
            currentState.inventory.addResourceInventory(drone.buildCost);
        }
        for (let region of currentState.combat.battlefield.regions) {
            currentState.inventory.addResourceInventory(region.collectResources());
        }
        currentState.map.exploreRegion(currentState.map.playerLocation, 3);
        returnToMap();
    }

    export function beginTargeting(user: Unit, skill: Skill): void {
        currentTargetingState = {
            active: true,
            user,
            skill,
            targetables: currentState.combat.battlefield.getTargetables(user, skill.targetingMode),
            target: undefined
        };
    }

    export function cancelTargeting(): void {
        currentTargetingState.active = false;
    }

    export function target(target: Targetable): void {
        if (!currentTargetingState.active || !currentTargetingState.targetables.includes(target)) {
            throw new Error('Game.target() called while not targeting, somehow');
        }
        currentState.combat.useSkill(currentTargetingState.user!, currentTargetingState.skill!, target, currentState.inventory);
        currentTargetingState.active = false;
    }

    export function isCurrentlyUsing(user: Unit, skill?: Skill): boolean {
        if (currentTargetingState.active === false) {
            return false;
        }
        if (skill === undefined) {
            return currentTargetingState.user === user;
        }
        return currentTargetingState.user === user && currentTargetingState.skill === skill;
    }

    export function isCurrentlyBeingTargeted(target: Targetable): boolean {
        return currentTargetingState.active && currentTargetingState.target === target;
    }

    export async function advanceTurn(): Promise<void> {
        currentState.combat.isEnemyTurn = true;
        const actionGenerator = currentState.combat.calculateEnemyActions();
        for (let action of actionGenerator) {
            currentTargetingState = {
                active: true,
                target: action.target,
                targetables:currentState.combat.battlefield.getTargetables(action.user, action.skill.targetingMode),
                user: action.user,
                skill: action.skill
            };
            console.log(action);
            await Promises.wait(2);
            target(action.target);
        }
        currentState.combat.advanceTurn();
        currentState.combat.isEnemyTurn = false;
    }

    export function build(species: UnitSpecies): void {
        console.log(`Building ${species.name}`);
        const region = currentState.combat.tank.containingRegion;
        if (region !== undefined) {
            region.addUnit(species.instantiate());
            currentState.combat.buildActions -= species.buildActionCost;
        }
    }

    export function creditsActive(): boolean {
        return currentState.creditsActive;
    }

    export function toggleCredits(): void {
        currentState.creditsActive = !currentState.creditsActive;
    }

    export function setCreditsActive(value: boolean): void {
        currentState.creditsActive = value;
    }

    export function titleActive(): boolean {
        return currentState.titleActive;
    }

    export function toggleTitle(): void {
        currentState.titleActive = !currentState.titleActive;
    }

    export function setTitleActive(value: boolean): void {
        currentState.titleActive = value;
    }

    export function noteActive(): boolean {
        return currentState.activeNote !== undefined;
    }

    export function viewNote(note: Note): void {
        currentState.activeNote = note;
    }

    export function activeNote(): Note | undefined {
        return currentState.activeNote;
    }

    export function hideNote(): void {
        currentState.activeNote = undefined;
    }

    export function retire(): void {
        currentState.activeNote = Note.Victory;
    }

}
