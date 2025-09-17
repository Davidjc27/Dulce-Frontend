// src/app/pages/home/home.spec.ts
import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home'; 

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent], // standalone
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
