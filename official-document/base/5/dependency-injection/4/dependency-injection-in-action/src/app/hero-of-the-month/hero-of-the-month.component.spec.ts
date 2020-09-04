import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOfTheMonthComponent } from './hero-of-the-month.component';

describe('HeroOfTheMonthComponent', () => {
  let component: HeroOfTheMonthComponent;
  let fixture: ComponentFixture<HeroOfTheMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroOfTheMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
