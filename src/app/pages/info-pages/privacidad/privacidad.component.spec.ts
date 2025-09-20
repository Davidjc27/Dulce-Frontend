import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadPageComponent } from './privacidad.component';

describe('PrivacidadPageComponent', () => {
  let component: PrivacidadPageComponent;
  let fixture: ComponentFixture<PrivacidadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacidadPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});