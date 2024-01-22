import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssetRequisitionFormComponent } from './add-edit-asset-requisition-form.component';

describe('AddEditAssetRequisitionFormComponent', () => {
  let component: AddEditAssetRequisitionFormComponent;
  let fixture: ComponentFixture<AddEditAssetRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAssetRequisitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAssetRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
