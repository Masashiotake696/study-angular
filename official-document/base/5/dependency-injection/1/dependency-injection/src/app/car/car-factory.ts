import { Car, Engine, Tires } from './car';

// BAD pattern!
export class CarFactory {
  createCar(): Car {
    const car = new Car(this.createEngine(), this.createTires());
    car.description = 'Factory';
    return car;
  }

  createEngine(): Engine {
    return new Engine();
  }

  createTires(): Tires {
    return new Tires();
  }
}
