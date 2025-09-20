import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPqrPageComponent } from './consultar-pqr.component';

describe('ConsultarPqrPageComponent', () => {
  let component: ConsultarPqrPageComponent;
  let fixture: ComponentFixture<ConsultarPqrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPqrPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarPqrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});