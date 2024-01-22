import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTrackingComponent } from './asset-tracking.component';

describe('AssetTrackingComponent', () => {
  let component: AssetTrackingComponent;
  let fixture: ComponentFixture<AssetTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
