import { Component } from '@angular/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heroes: Hero[] = [
    { id: 1, name: 'Taro' },
    { id: 2, name: 'Jiro' },
    { id: 3, name: 'Saburo' },
  ];

  deleteHero(hero: Hero): void {
    console.log(`Delete hero id=${hero.id}`);
  }

  onSave(event: MouseEvent): void {
    console.log(event);
  }

  onSubmit(form: any): void {
    console.log(form);
  }
}
