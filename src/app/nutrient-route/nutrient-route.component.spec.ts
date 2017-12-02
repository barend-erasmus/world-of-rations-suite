import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientRouteComponent } from './nutrient-route.component';

describe('NutrientRouteComponent', () => {
  let component: NutrientRouteComponent;
  let fixture: ComponentFixture<NutrientRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrientRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
