import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasPageComponent } from './tiendas.component';

describe('TiendasPageComponent', () => {
  let component: TiendasPageComponent;
  let fixture: ComponentFixture<TiendasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendasPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TiendasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});