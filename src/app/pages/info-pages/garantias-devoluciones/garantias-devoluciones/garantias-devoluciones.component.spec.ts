
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiasDevolucionesPageComponent } from './garantias-devoluciones.component';

describe('GarantiasDevolucionesPageComponent', () => {
  let component: GarantiasDevolucionesPageComponent;
  let fixture: ComponentFixture<GarantiasDevolucionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarantiasDevolucionesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GarantiasDevolucionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});