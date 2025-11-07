import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAerodromoComponent } from './grafico-aerodromo.component';

describe('GraficoAerodromoComponent', () => {
  let component: GraficoAerodromoComponent;
  let fixture: ComponentFixture<GraficoAerodromoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoAerodromoComponent]
    });
    fixture = TestBed.createComponent(GraficoAerodromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
