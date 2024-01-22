import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequisitionFormComponent } from './asset-requisition-form.component';

describe('AssetRequisitionFormComponent', () => {
  let component: AssetRequisitionFormComponent;
  let fixture: ComponentFixture<AssetRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRequisitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
