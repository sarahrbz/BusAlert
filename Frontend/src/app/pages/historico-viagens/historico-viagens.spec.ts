import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoViagens } from './historico-viagens';

describe('HistoricoViagens', () => {
  let component: HistoricoViagens;
  let fixture: ComponentFixture<HistoricoViagens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoViagens],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoViagens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
