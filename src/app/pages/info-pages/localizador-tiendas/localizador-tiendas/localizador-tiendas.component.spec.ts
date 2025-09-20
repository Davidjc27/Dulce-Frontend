import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorTiendasPageComponent } from './localizador-tiendas.component';

describe('LocalizadorTiendasPageComponent', () => {
  let component: LocalizadorTiendasPageComponent;
  let fixture: ComponentFixture<LocalizadorTiendasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalizadorTiendasPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalizadorTiendasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});