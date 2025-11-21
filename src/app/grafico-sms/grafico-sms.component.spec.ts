import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSmsComponent } from './grafico-sms.component';

describe('GraficoSmsComponent', () => {
  let component: GraficoSmsComponent;
  let fixture: ComponentFixture<GraficoSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoSmsComponent]
    });
    fixture = TestBed.createComponent(GraficoSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
