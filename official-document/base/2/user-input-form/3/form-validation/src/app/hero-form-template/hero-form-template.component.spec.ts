import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormTemplateComponent } from './hero-form-template.component';

describe('HeroFormTemplateComponent', () => {
  let component: HeroFormTemplateComponent;
  let fixture: ComponentFixture<HeroFormTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroFormTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
