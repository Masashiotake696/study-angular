import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoCheckParentComponent } from './do-check-parent.component';

describe('DoCheckParentComponent', () => {
  let component: DoCheckParentComponent;
  let fixture: ComponentFixture<DoCheckParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoCheckParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoCheckParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
