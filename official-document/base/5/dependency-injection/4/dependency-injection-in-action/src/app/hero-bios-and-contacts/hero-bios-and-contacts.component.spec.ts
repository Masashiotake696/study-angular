import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBiosAndContactsComponent } from './hero-bios-and-contacts.component';

describe('HeroBiosAndContactsComponent', () => {
  let component: HeroBiosAndContactsComponent;
  let fixture: ComponentFixture<HeroBiosAndContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroBiosAndContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBiosAndContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
