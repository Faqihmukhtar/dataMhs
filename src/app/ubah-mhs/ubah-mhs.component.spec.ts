import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahMhsComponent } from './ubah-mhs.component';

describe('UbahMhsComponent', () => {
  let component: UbahMhsComponent;
  let fixture: ComponentFixture<UbahMhsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbahMhsComponent]
    });
    fixture = TestBed.createComponent(UbahMhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
