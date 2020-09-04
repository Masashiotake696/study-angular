import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBiosComponent } from './hero-bios.component';

describe('HeroBiosComponent', () => {
  let component: HeroBiosComponent;
  let fixture: ComponentFixture<HeroBiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroBiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
