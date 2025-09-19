import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosBeneficios } from './puntos-beneficios';

describe('PuntosBeneficios', () => {
  let component: PuntosBeneficios;
  let fixture: ComponentFixture<PuntosBeneficios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosBeneficios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosBeneficios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
