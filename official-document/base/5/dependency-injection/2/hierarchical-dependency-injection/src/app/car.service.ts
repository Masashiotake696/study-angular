import { Injectable } from '@angular/core';

/// Model ///
export class Car {
  name = 'Avocado Motors';

  constructor(public engine: Engine, public tires: Tires) {}

  get description(): string {
    return `${this.name} car with ${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
}

export class Engine {
  cylinders = 4;
}

export class Tires {
  make = 'Flintstone';
  model = 'Square';
}

/// Engine services ///
@Injectable({
  providedIn: 'root'
})
export class EngineService {
  id = 'E1';

  getEngine(): Engine {
    return new Engine();
  }
}

@Injectable({
  providedIn: 'root'
})
export class EngineService2 {
  id = 'E2';

  getEngine(): Engine {
    const engine = new Engine();
    engine.cylinders = 8;
    return engine;
  }
}

/// Tire services ///
@Injectable({
  providedIn: 'root'
})
export class TiresService {
  id = 'T1';

  getTires(): Tires {
    return new Tires();
  }
}

/// Car services ///
@Injectable({
  providedIn: 'root'
})
export class CarService {
  id = 'C1';

  constructor(
    protected engineService: EngineService,
    protected tiresService: TiresService
  ) { }

  getCar(): Car {
    return new Car(
      this.engineService.getEngine(),
      this.tiresService.getTires()
    );
  }

  get name(): string {
    return `${this.id}-${this.engineService.id}-${this.tiresService.id}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CarService2 extends CarService {
  id = 'C2';

  constructor(
    protected engineService: EngineService,
    protected tiresService: TiresService
  ) {
    super(engineService, tiresService);
  }

  getCar(): Car {
    const car = super.getCar();
    car.name = 'BamBam Motors, BroVan 2000';
    return car;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CarService3 extends CarService2 {
  id = 'C3';

  constructor(
    protected engineService: EngineService,
    protected tiresService: TiresService
  ) {
    super(engineService, tiresService);
  }

  getCar(): Car {
    const car = super.getCar();
    car.name = 'Chizzamm Motors, Calico UltraMax Supreme';
    return car;
  }
}
