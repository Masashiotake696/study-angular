import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedHeroesComponent } from './sorted-heroes.component';

describe('SortedHeroesComponent', () => {
  let component: SortedHeroesComponent;
  let fixture: ComponentFixture<SortedHeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortedHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortedHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
