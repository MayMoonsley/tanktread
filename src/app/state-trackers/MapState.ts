import { ThrowStmt } from '@angular/compiler';
import { Biome, MapTile } from '../classes/MapTile';
import { Random } from '../util/Random';
import { Numbers } from '../util/Numbers';

export class MapState {

    tiles: MapTile[][];
    private width: number;
    private height: number;

    public constructor(tiles?: MapTile[][], public tankX: number = 0, public tankY: number = 0) {
        if (tiles !== undefined) {
            this.tiles = tiles;
            this.height = tiles.length;
            this.width = tiles[0].length;
        } else {
            this.width = 10;
            this.height = 10;
            this.tiles = this.generateMap(this.width, this.height);
        }
        this.updateLocation();
    }

    get symbols(): string[][] {
        return this.tiles.map(arr => arr.map(tile => tile.symbol));
    }

    public moveTank(dx: number, dy: number) {
        this.tankX = Numbers.clamp(this.tankX + dx, 0, this.width - 1);
        this.tankY = Numbers.clamp(this.tankY + dy, 0, this.height - 1);
        this.updateLocation();
    }

    private generateMap(width: number, height: number): MapTile[][] {
        const r: MapTile[][] = [];
        for (let y = 0; y < height; y++) {
            r[y] = [];
            for (let x = 0; x < width; x++) {
                r[y][x] = new MapTile(Random.fromArray([Biome.Desert, Biome.Forest, Biome.Mountain, Biome.Ocean]));
            }
        }
        return r;
    }

    private updateLocation() {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                this.tiles[y][x].tankHere = (x === this.tankX && y === this.tankY);
            }
        }
    }

}