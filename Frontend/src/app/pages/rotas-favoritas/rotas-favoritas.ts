import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rotas-favoritas',
  standalone: false,
  templateUrl: './rotas-favoritas.html',
  styleUrl: './rotas-favoritas.css',
})
export class RotasFavoritas {

  constructor(private router: Router){}
  abrirRota(rota: any) {

  localStorage.setItem(
    'rotaSelecionada',
    JSON.stringify(rota)
  );

  this.router.navigate(['/rota-monitoramento']);

}
  favoritos = [
  {
    linha: '080',
    origem: 'FATEC Itu',
    destino: 'Rodoviária de Itu',
    local: 'Saída da FATEC',
    horario: '18:10',
    categoria: 'Faculdade → Rodoviária',
    tempo: '25 min',
    origemLat: -23.290250,
    origemLng: -47.296400,

    destinoLat: -23.2601498677427,
    destinoLng: -47.29551269311952
  },
  {
    linha: '031',
    origem: 'FATEC Itu',
    destino: 'Plaza Shopping Itu',
    local: 'Saída da FATEC',
    horario: '18:15',
    categoria: 'Faculdade → Lazer',
    tempo: '18 min',
    origemLat: -23.290250,
    origemLng: -47.296400,

    destinoLat: -23.263881244120707,
    destinoLng: -47.28027259496379
  },
  {
    linha: '220',
    origem: 'FATEC Itu',
    destino: 'Cidade Nova',
    local: 'Saída da FATEC',
    horario: '18:20',
    categoria: 'Faculdade → Casa',
    tempo: '32 min',
    origemLat: -23.290250,
  origemLng: -47.296400,

  destinoLat: -23.386788922274338,
  destinoLng: -47.3360810689405
  }
];
}
