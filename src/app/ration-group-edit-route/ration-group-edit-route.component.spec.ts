import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationGroupEditRouteComponent } from './ration-group-edit-route.component';

describe('RationGroupEditRouteComponent', () => {
  let component: RationGroupEditRouteComponent;
  let fixture: ComponentFixture<RationGroupEditRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationGroupEditRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationGroupEditRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
