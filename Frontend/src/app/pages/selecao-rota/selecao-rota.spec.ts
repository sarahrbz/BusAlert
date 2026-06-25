import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoRota } from './selecao-rota';

describe('SelecaoRota', () => {
  let component: SelecaoRota;
  let fixture: ComponentFixture<SelecaoRota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecaoRota],
    }).compileComponents();

    fixture = TestBed.createComponent(SelecaoRota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
