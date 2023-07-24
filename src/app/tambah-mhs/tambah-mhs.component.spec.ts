import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahMhsComponent } from './tambah-mhs.component';

describe('TambahMhsComponent', () => {
  let component: TambahMhsComponent;
  let fixture: ComponentFixture<TambahMhsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TambahMhsComponent]
    });
    fixture = TestBed.createComponent(TambahMhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
