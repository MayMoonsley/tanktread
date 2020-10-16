export class Biome {

    public static readonly Desert = new Biome('Desert', '🏜️');
    public static readonly Forest = new Biome('Forest', '🌳');
    public static readonly Mountain = new Biome('Mountain', '⛰️');
    public static readonly Ocean = new Biome('Ocean', '🌊');

    private constructor(private _name: string, private _symbol: string) {};

    get name(): string {
        return this._name;
    }

    get symbol(): string {
        return this._symbol;
    }

}

export class MapTile {

    public tankHere: boolean = false;

    public constructor(public biome: Biome, public cityName?: string) {};

    get symbol(): string {
        if (this.cityName !== undefined) {
            return '🏙️';
        }
        return this.biome.symbol;
    }

    get tankedSymbol(): string {
        if (this.tankHere) {
            return '🚗';
        }
        return this.symbol;
    }

    get name(): string {
        if (this.cityName !== undefined) {
            return `The City of ${this.cityName}`;
        } else {
            return this.biome.name;
        }
    }

}