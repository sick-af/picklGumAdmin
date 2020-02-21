import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTypesComponent } from './partner-types.component';

describe('PartnerTypesComponent', () => {
  let component: PartnerTypesComponent;
  let fixture: ComponentFixture<PartnerTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
