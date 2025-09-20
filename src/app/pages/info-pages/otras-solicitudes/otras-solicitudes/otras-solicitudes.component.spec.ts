import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasSolicitudesPageComponent } from './otras-solicitudes.component';

describe('OtrasSolicitudesPageComponent', () => {
  let component: OtrasSolicitudesPageComponent;
  let fixture: ComponentFixture<OtrasSolicitudesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrasSolicitudesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtrasSolicitudesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});