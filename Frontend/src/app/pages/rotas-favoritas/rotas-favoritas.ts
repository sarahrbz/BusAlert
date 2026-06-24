import { Component } from '@angular/core';

@Component({
  selector: 'app-rotas-favoritas',
  standalone: false,
  templateUrl: './rotas-favoritas.html',
  styleUrl: './rotas-favoritas.css',
})
export class RotasFavoritas {
  favoritos = [
  {
    linha: '473',
    origem: 'Centro',
    destino: 'Terminal Norte',
    local: 'Saída de Casa',
    horario: '07:30',
    categoria: 'Casa → Trabalho',
    tempo: '25 min'
  },
  {
    linha: '218',
    origem: 'Bairro Jardim',
    destino: 'Centro',
    local: 'Saída de Casa',
    horario: '17:45',
    categoria: 'Trabalho → Casa',
    tempo: '32 min'
  },
  {
    linha: '560',
    origem: 'Shopping',
    destino: 'Terminal Sul',
    local: 'Saída do Shopping',
    horario: '14:00',
    categoria: 'Lazer',
    tempo: '28 min'
  }
];
}
