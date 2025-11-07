import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLvComponent } from './detalle-lv.component';

describe('DetalleLvComponent', () => {
  let component: DetalleLvComponent;
  let fixture: ComponentFixture<DetalleLvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLvComponent]
    });
    fixture = TestBed.createComponent(DetalleLvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
