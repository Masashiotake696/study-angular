import { Component } from '@angular/core';

import {
  CarService, CarService2, CarService3,
  EngineService, EngineService2,
  TiresService
} from '../car.service';

///////// CCarComponent /////////
@Component({
  selector: 'app-c-car',
  template: `<div>C: {{ description }}</div>`,
  // CarService3のコンストラクタで使用している、EngineService、TiresServiceはそれぞれ、CarBのインジェクターとCarAのインジェクターから解決して取り出す
  providers: [
    { provide: CarService, useClass: CarService3 }
  ]
})
export class CCarComponent {
  description: string;

  constructor(carService: CarService) {
    this.description = `${carService.getCar().description} (${carService.name})`;
  }
}

///////// BCarComponent /////////
@Component({
  selector: 'app-b-car',
  template: `
    <div>B: {{ description }}</div>
    <app-c-car></app-c-car>
  `,
  providers: [
    { provide: CarService, useClass: CarService2 },
    { provide: EngineService, useClass: EngineService2 }
  ]
})
export class BCarComponent {
  description: string;

  constructor(carService: CarService) {
    this.description = `${carService.getCar().description} (${carService.name})`;
  }
}

///////// ACarComponent /////////
@Component({
  selector: 'app-a-car',
  template: `
    <div>A: {{ description }}</div>
    <app-b-car></app-b-car>
  `
})
export class ACarComponent {
  description: string;

  constructor(carService: CarService) {
    this.description = `${carService.getCar().description} (${carService.name})`;
  }
}

///////// CarsComponent /////////
@Component({
  selector: 'app-cars',
  template: `
    <h3>Cars</h3>
    <app-a-car></app-a-car>
  `
})
export class CarsComponent { }

export const carServices = [
  CarService, EngineService, TiresService,
];
