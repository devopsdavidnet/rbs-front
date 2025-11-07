import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosLvComponent } from './graficos-lv.component';

describe('GraficosLvComponent', () => {
  let component: GraficosLvComponent;
  let fixture: ComponentFixture<GraficosLvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficosLvComponent]
    });
    fixture = TestBed.createComponent(GraficosLvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
