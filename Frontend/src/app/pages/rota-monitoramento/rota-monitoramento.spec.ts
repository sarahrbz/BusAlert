import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaMonitoramento } from './rota-monitoramento';

describe('RotaMonitoramento', () => {
  let component: RotaMonitoramento;
  let fixture: ComponentFixture<RotaMonitoramento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RotaMonitoramento],
    }).compileComponents();

    fixture = TestBed.createComponent(RotaMonitoramento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
