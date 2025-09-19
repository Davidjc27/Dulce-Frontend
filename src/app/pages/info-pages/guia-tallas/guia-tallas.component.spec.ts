import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaTallas } from './guia-tallas';

describe('GuiaTallas', () => {
  let component: GuiaTallas;
  let fixture: ComponentFixture<GuiaTallas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaTallas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaTallas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
