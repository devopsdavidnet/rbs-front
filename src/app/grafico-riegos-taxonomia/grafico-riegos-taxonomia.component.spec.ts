import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoRiegosTaxonomiaComponent } from './grafico-riegos-taxonomia.component';

describe('GraficoRiegosTaxonomiaComponent', () => {
  let component: GraficoRiegosTaxonomiaComponent;
  let fixture: ComponentFixture<GraficoRiegosTaxonomiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoRiegosTaxonomiaComponent]
    });
    fixture = TestBed.createComponent(GraficoRiegosTaxonomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
