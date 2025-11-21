import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorSmsComponent } from './valor-sms.component';

describe('ValorSmsComponent', () => {
  let component: ValorSmsComponent;
  let fixture: ComponentFixture<ValorSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorSmsComponent]
    });
    fixture = TestBed.createComponent(ValorSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
