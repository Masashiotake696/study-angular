export interface Hero {
  id: number;
  name: string;
  canFly: boolean;
}

export const HEROES: Hero[] = [
  { id: 1, name: 'Windstorm', canFly: true },
  { id: 2, name: 'Bombasto',  canFly: false },
  { id: 3, name: 'Magneto',   canFly: false },
  { id: 4, name: 'Tornado',   canFly: true },
];
