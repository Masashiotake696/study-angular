import { Injector } from '@angular/core';

import { Car, Engine, Tires } from './car';
import { Logger } from '../logger.service';

export function useInjector(): Car {
  let injector: Injector;

  injector = Injector.create({
    providers: [
      { provide: Car, deps: [Engine, Tires] },
      { provide: Engine },
      { provide: Tires },
    ]
  });

  const car = injector.get(Car);
  car.description = 'Injector';

  injector = Injector.create({
    providers: [
      { provide: Logger }
    ]
  });
  const logger = injector.get(Logger);
  logger.log(`Injector car.drive() said: ${car.drive()}`);
  return car;
}
