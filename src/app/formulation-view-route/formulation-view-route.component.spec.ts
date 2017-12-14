import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationViewRouteComponent } from './formulation-view-route.component';

describe('FormulationViewRouteComponent', () => {
  let component: FormulationViewRouteComponent;
  let fixture: ComponentFixture<FormulationViewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulationViewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulationViewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
