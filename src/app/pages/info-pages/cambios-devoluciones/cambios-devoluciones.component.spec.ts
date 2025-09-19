import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosDevoluciones } from './cambios-devoluciones';

describe('CambiosDevoluciones', () => {
  let component: CambiosDevoluciones;
  let fixture: ComponentFixture<CambiosDevoluciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiosDevoluciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiosDevoluciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
