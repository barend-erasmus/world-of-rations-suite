import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientEditRouteComponent } from './nutrient-edit-route.component';

describe('NutrientEditRouteComponent', () => {
  let component: NutrientEditRouteComponent;
  let fixture: ComponentFixture<NutrientEditRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrientEditRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientEditRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
