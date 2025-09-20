import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosBeneficiosPageComponent } from './puntos-beneficios.component';

describe('PuntosBeneficiosPageComponent', () => {
  let component: PuntosBeneficiosPageComponent;
  let fixture: ComponentFixture<PuntosBeneficiosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosBeneficiosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntosBeneficiosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});