import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaTallasPageComponent } from './guia-tallas.component';

describe('GuiaTallasPageComponent', () => {
  let component: GuiaTallasPageComponent;
  let fixture: ComponentFixture<GuiaTallasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaTallasPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuiaTallasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});