import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipselfComponent } from './skipself.component';

describe('SkipselfComponent', () => {
  let component: SkipselfComponent;
  let fixture: ComponentFixture<SkipselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
