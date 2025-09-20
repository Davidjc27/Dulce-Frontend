import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPagoPageComponent } from './metodos-pago.component';

describe('MetodosPagoPageComponent', () => {
  let component: MetodosPagoPageComponent;
  let fixture: ComponentFixture<MetodosPagoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodosPagoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetodosPagoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});