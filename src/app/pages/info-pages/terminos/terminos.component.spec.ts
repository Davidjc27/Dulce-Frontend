import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosPageComponent } from './terminos.component';

describe('TerminosPageComponent', () => {
  let component: TerminosPageComponent;
  let fixture: ComponentFixture<TerminosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});