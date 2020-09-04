import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesBaseComponent } from './heroes-base.component';

describe('HeroesBaseComponent', () => {
  let component: HeroesBaseComponent;
  let fixture: ComponentFixture<HeroesBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
