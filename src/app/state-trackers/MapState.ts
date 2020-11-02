import { Biome, MapTile } from '../classes/MapTile';
import { City } from '../classes/City';
import { Random } from '../util/Random';
import { Numbers } from '../util/Numbers';

export class MapState {

    tiles: MapTile[][];
    private width: number;
    private height: number;
    private _playerLocation!: MapTile;
    public biomes: Biome[];
    private _location: Biome;
    public city?: City;

    public constructor(tiles?: MapTile[][], public tankX: number = 0, public tankY: number = 0) {
        this.biomes = [
            Biome.Ocean,
            Biome.Forest,
            Biome.Mountain,
            Biome.Desert
        ];
        this._location = Biome.Desert;
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

    get playerLocation(): Biome {
        return this._location;
    }

    public moveTank(biome: Biome): void {
        this._location = biome;
    }

    private generateMap(width: number, height: number): MapTile[][] {
        const r: MapTile[][] = [];
        for (let y = 0; y < height; y++) {
            r[y] = [];
            for (let x = 0; x < width; x++) {
                r[y][x] = new MapTile(Random.fromArray([Biome.Desert, Biome.Forest, Biome.Mountain, Biome.Ocean]));
            }
        }
        const cities: City[] = City.getCities();
        const points: [number, number][] = Random.points(cities.length, width, height);
        for (let i = 0; i < cities.length; i++) {
            const point = points[i];
            r[point[1]][point[0]].city = cities[i];
        }
        return r;
    }

    private updateLocation(): void {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                this.tiles[y][x].tankHere = (x === this.tankX && y === this.tankY);
                if (this.tiles[y][x].tankHere) {
                    this._playerLocation = this.tiles[y][x];
                }
            }
        }
    }

}