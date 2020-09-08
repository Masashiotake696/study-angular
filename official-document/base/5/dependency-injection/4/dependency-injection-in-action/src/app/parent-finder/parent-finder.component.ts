import { Component, forwardRef, Type, Optional, SkipSelf } from '@angular/core';

// A component base class (see AlexComponent)
export abstract class Base {
  name = 'Count Basie';
}

// Marker class, used as an interface
export abstract class Parent {
  name: string;
}

const DifferentParent = Parent;

// Helper method to provide the current component instance in the name of a 'parentType'.
// The 'parentType' defaults to 'Parent' when omitting the second parameter.
export function provideParent(component: any, parentType?: any): { provide: any, useExisting: Type<any>} {
  return { provide: parentType || Parent, useExisting: forwardRef(() => component) };
}

// Simpler syntax version that always providers the component in the name of 'Parent'.
export function provideTheParent(component: any): { provide: Parent, useExisting: Type<any> } {
  return { provide: Parent, useExisting: forwardRef(() => component) };
}

////////// C - Child //////////
const templateC = `
  <div class="c">
    <h3>{{ name }}</h3>
    <p>My parent is {{ parent?.name }}</p>
  </div>
`;

@Component({
  selector: 'app-carol',
  template: templateC,
})
export class CarolComponent {
  name = 'Carol';

  constructor(@Optional() public parent?: Parent) { }
}

@Component({
  selector: 'app-chris',
  template: templateC,
})
export class ChrisComponent {
  name = 'Chris';

  constructor(@Optional() public parent?: Parent) { }
}

////////// Craig //////////
@Component({
  selector: 'app-craig',
  template: `
    <div class="c">
      <h3>Craig</h3>
      {{ alex ? 'Found' : 'Did not find' }} Alex via the base class.
    </div>
  `
})
export class CraigComponent {
  constructor(@Optional() public alex?: Base) { }
}

////////// B - Parent //////////
const templateB = `
  <div class="b">
    <div>
      <h3>{{ name }}</h3>
      <p>My parent is {{ parent?.name }}</p>
    </div>
    <app-carol></app-carol>
    <app-chris></app-chris>
  </div>
`;

@Component({
  selector: 'app-barry',
  template: templateB,
  providers: [
    { provide: Parent, useExisting: forwardRef(() => BarryComponent) }
  ]
})
export class BarryComponent implements Parent {
  name = 'Barry';

  constructor(@SkipSelf() @Optional() public parent?: Parent) { }
}

@Component({
  selector: 'app-bob',
  template: templateB,
  providers: [
    provideParent(BobComponent)
  ]
})
export class BobComponent implements Parent {
  name = 'Bob';

  constructor(@SkipSelf() @Optional() public parent?: Parent) { }
}

@Component({
  selector: 'app-beth',
  template: templateB,
  providers: [
    provideParent(BethComponent, DifferentParent)
  ]
})
export class BethComponent implements Parent {
  name = 'Beth';

  constructor(@SkipSelf() @Optional() public parent?: Parent) { }
}

////////// A- GrandParent //////////
@Component({
  selector: 'app-alex',
  template: `
    <div class="a">
      <h3>{{ name }}</h3>
      <app-cathy></app-cathy>
      <app-craig></app-craig>
      <app-carol></app-carol>
    </div>
  `,
  providers: [
    { provide: Parent, useExisting: forwardRef(() => AlexComponent) },
    // { provide: Base, useExisting: forwardRef(() => AlexComponent) },
  ]
})
export class AlexComponent extends Base {
  name = 'Alex';
}

//////////

@Component({
  selector: 'app-alice',
  template: `
    <div class="a">
      <h3>{{ name }}</h3>
      <app-barry></app-barry>
      <app-beth></app-beth>
      <app-bob></app-bob>
      <app-carol></app-carol>
    </div>
  `,
  providers: [
    provideParent(AliceComponent),
  ]
})
export class AliceComponent implements Parent {
  name = 'Alice';
}

////////// Cathy //////////
@Component({
  selector: 'app-cathy',
  template: `
    <div class="c">
      <h3>Cathy</h3>
      {{ alex ? 'Found' : 'Did not find' }} Alex via the component class.
    </div>
  `
})
export class CathyComponent {
  constructor(@Optional() public alex?: AlexComponent) { }
}

@Component({
  selector: 'app-parent-finder',
  template: `
    <h2>Parent Finer</h2>
    <app-alex></app-alex>
    <app-alice></app-alice>
  `,
})
export class ParentFinderComponent { }
