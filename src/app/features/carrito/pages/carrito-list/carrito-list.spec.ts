import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarritoListComponent } from './carrito-list';

describe('CarritoList', () => {
  let component: CarritoListComponent;
  let fixture: ComponentFixture<CarritoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CarritoListComponent,           // standalone
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
