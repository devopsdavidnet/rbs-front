import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoNcrComponent } from './grafico-ncr.component';

describe('GraficoNcrComponent', () => {
  let component: GraficoNcrComponent;
  let fixture: ComponentFixture<GraficoNcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoNcrComponent]
    });
    fixture = TestBed.createComponent(GraficoNcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
