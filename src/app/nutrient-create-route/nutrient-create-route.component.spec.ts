import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientCreateRouteComponent } from './nutrient-create-route.component';

describe('NutrientCreateRouteComponent', () => {
  let component: NutrientCreateRouteComponent;
  let fixture: ComponentFixture<NutrientCreateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrientCreateRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientCreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
