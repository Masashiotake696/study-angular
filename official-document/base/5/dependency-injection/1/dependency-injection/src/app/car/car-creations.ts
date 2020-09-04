// Example with car and engine variations

import { Car, Engine, Tires } from './car';

////////// Example 1 //////////
export function simpleCar(): Car {
  const car = new Car(new Engine(), new Tires());
  car.description = 'Simple';
  return car;
}

////////// Example 2 //////////
class Engine2 {
  constructor(public cylinders: number) {}
}

export function superCar(): Car {
  const bigCylinders = 12;
  const car = new Car(new Engine2(bigCylinders), new Tires());
  car.description = 'Super';
  return car;
}

////////// Example 3 //////////
class MockEngine extends Engine {
  cylinders = 8;
}
class MockTires extends Tires {
  make = 'YokoGoodStone';
}

export function testCar(): Car {
  const car = new Car(new MockEngine(), new MockTires());
  car.description = 'Test';
  return car;
}
