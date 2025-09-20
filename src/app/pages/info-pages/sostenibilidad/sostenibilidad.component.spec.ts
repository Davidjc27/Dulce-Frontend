import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SostenibilidadPageComponent } from './sostenibilidad.component';

describe('SostenibilidadPageComponent', () => {
  let component: SostenibilidadPageComponent;
  let fixture: ComponentFixture<SostenibilidadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SostenibilidadPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SostenibilidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});