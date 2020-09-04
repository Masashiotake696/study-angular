import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsListComponent } from './villains-list.component';

describe('VillainsListComponent', () => {
  let component: VillainsListComponent;
  let fixture: ComponentFixture<VillainsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillainsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
