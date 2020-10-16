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
        if (this.tankHere) {
            return '🚗';
        }
        if (this.cityName !== undefined) {
            return '🏙️';
        }
        return this.biome.symbol;
    }

    get name(): string {
        let r: string = '';
        if (this.cityName !== undefined) {
            r = `The City of ${this.cityName}`;
        } else {
            r = this.biome.name;
        }
        if (this.tankHere) {
            return `${r} (You Are Here)`;
        }
        return r;
    }

}