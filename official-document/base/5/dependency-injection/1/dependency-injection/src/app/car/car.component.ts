import { Component } from '@angular/core';

import { Car, Engine, Tires } from './car';
import { Car as CarNoDi } from './car-no-di';
import { useInjector } from './car-injector';
import { CarFactory } from './car-factory';
import { simpleCar, superCar, testCar } from './car-creations';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [
    Car, Engine, Tires
  ]
})
export class CarComponent {
  noDiCar = new CarNoDi();
  injectorCar = useInjector();
  factoryCar = (new CarFactory()).createCar();
  simpleCar = simpleCar();
  superCar = superCar();
  testCar = testCar();

  constructor(public car: Car) { }

}
