import { Hero } from './hero';

let nextId = 100;

export class HeroTaxReturn {
  constructor(
    public id = nextId++,
    public hero: Hero,
    public income = 0
  ) {
    if (id === 0) {
      id = nextId++;
    }
  }

  get name(): string {
    return this.hero.name;
  }

  get tax(): number {
    return this.income ? .10 * this.income : 0;
  }

  get tid(): string {
    return this.hero.tid;
  }

  toString(): string {
    return `${this.hero.name}`;
  }

  // 新しいオブジェクトを作成して返却
  clone(): HeroTaxReturn {
    return new HeroTaxReturn(this.id, this.hero, this.income);
  }
}
