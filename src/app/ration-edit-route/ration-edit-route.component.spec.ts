import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationEditRouteComponent } from './ration-edit-route.component';

describe('RationEditRouteComponent', () => {
  let component: RationEditRouteComponent;
  let fixture: ComponentFixture<RationEditRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationEditRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationEditRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
