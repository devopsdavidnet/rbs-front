import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNcrLvComponent } from './detalle-ncr-lv.component';

describe('DetalleNcrLvComponent', () => {
  let component: DetalleNcrLvComponent;
  let fixture: ComponentFixture<DetalleNcrLvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleNcrLvComponent]
    });
    fixture = TestBed.createComponent(DetalleNcrLvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
