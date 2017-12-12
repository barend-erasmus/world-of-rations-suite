import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsRouteComponent } from './tips-route.component';

describe('TipsRouteComponent', () => {
  let component: TipsRouteComponent;
  let fixture: ComponentFixture<TipsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
