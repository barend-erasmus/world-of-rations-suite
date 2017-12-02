import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RationsRouteComponent } from './rations-route.component';

describe('RationsRouteComponent', () => {
  let component: RationsRouteComponent;
  let fixture: ComponentFixture<RationsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RationsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
