import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionComponent } from './ejecucion.component';

describe('EjecucionComponent', () => {
  let component: EjecucionComponent;
  let fixture: ComponentFixture<EjecucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjecucionComponent]
    });
    fixture = TestBed.createComponent(EjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
