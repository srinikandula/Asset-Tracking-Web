import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusNgMultiselectComponent } from './cus-ng-multiselect.component';

describe('CusNgMultiselectComponent', () => {
  let component: CusNgMultiselectComponent;
  let fixture: ComponentFixture<CusNgMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusNgMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusNgMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
