import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNcrComponent } from './detalle-ncr.component';

describe('DetalleNcrComponent', () => {
  let component: DetalleNcrComponent;
  let fixture: ComponentFixture<DetalleNcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleNcrComponent]
    });
    fixture = TestBed.createComponent(DetalleNcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
