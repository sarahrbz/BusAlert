import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotasFavoritas } from './rotas-favoritas';

describe('RotasFavoritas', () => {
  let component: RotasFavoritas;
  let fixture: ComponentFixture<RotasFavoritas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RotasFavoritas],
    }).compileComponents();

    fixture = TestBed.createComponent(RotasFavoritas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
