import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // 👈 importa el módulo de testing de router
import { CheckoutFormComponent } from './checkout-form.component';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,      // 👈 provee ActivatedRoute, RouterLink, etc.
        CheckoutFormComponent     // 👈 si es standalone, va aquí en imports
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
