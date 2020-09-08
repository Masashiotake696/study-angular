import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './heroes/hero';

type HeroObject = {
  heroes: Hero[]
};

export class InMemoryDataService implements InMemoryDbService {
  createDb(): HeroObject {
    const heroes: Hero[] = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
    ];

    return { heroes };
  }
}
