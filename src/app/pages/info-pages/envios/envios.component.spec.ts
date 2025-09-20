import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosPageComponent } from './envios.component';

describe('EnviosPageComponent', () => {
  let component: EnviosPageComponent;
  let fixture: ComponentFixture<EnviosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviosPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnviosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});