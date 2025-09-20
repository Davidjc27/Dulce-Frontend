import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosDevolucionesPageComponent } from './cambios-devoluciones.component';

describe('CambiosDevolucionesPageComponent', () => {
  let component: CambiosDevolucionesPageComponent;
  let fixture: ComponentFixture<CambiosDevolucionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiosDevolucionesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiosDevolucionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});