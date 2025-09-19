import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sostenibilidad } from './sostenibilidad';

describe('Sostenibilidad', () => {
  let component: Sostenibilidad;
  let fixture: ComponentFixture<Sostenibilidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sostenibilidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sostenibilidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
