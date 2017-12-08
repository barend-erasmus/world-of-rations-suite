import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationRouteComponent } from './formulation-route.component';

describe('FormulationRouteComponent', () => {
  let component: FormulationRouteComponent;
  let fixture: ComponentFixture<FormulationRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulationRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulationRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
