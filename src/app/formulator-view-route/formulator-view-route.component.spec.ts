import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulatorViewRouteComponent } from './formulator-view-route.component';

describe('FormulatorViewRouteComponent', () => {
  let component: FormulatorViewRouteComponent;
  let fixture: ComponentFixture<FormulatorViewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulatorViewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulatorViewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
