import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulatorRouteComponent } from './formulator-route.component';

describe('FormulatorRouteComponent', () => {
  let component: FormulatorRouteComponent;
  let fixture: ComponentFixture<FormulatorRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulatorRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulatorRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
