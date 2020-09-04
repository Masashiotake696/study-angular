import { Injectable } from '@angular/core';

@Injectable()
export class Engine {
  public cylinders = 4;
}

@Injectable()
export class Tires {
  public make = 'Flintstone';
  public model = 'Square';
}

@Injectable()
export class Car {
  public description = 'DI';

  constructor(public engine: Engine, public tires: Tires) {}

  drive(): string {
    return `${this.description} car with ${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}
