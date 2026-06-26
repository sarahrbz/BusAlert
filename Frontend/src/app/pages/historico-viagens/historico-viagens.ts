import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-viagens',
  standalone: false,
  templateUrl: './historico-viagens.html',
  styleUrl: './historico-viagens.css',
})
export class HistoricoViagens {

   filtroAtivo = 'todas';

  viagens = [
    {
      data: 'Hoje - 25 de junho',
      linha: '080',
      origem: 'FATEC Itu',
      destino: 'Rodoviária de Itu',
      horario: '08:15 - 08:40',
      paradas: 7,
      categoria: 'Faculdade',
      duracao: '25 min',
      cor: 'azul',
      tipo: 'hoje'
    },
    {
      data: 'Ontem - 24 de junho',
      linha: '031',
      origem: 'FATEC Itu',
      destino: 'Plaza Shopping Itu',
      horario: '17:30 - 18:02',
      paradas: 8,
      categoria: 'Lazer',
      duracao: '32 min',
      cor: 'laranja',
      tipo: 'ontem'
    },
    {
      data: '23 de junho',
      linha: '220',
      origem: 'FATEC Itu',
      destino: 'Cidade Nova',
      horario: '18:10 - 18:42',
      paradas: 9,
      categoria: 'Casa',
      duracao: '32 min',
      cor: 'laranja',
      tipo: 'ultimos7'
    }
  ];

  get viagensFiltradas() {
    if (this.filtroAtivo === 'todas') {
      return this.viagens;
    }

    return this.viagens.filter(
      viagem => viagem.tipo === this.filtroAtivo
    );
  }

  selecionarFiltro(filtro: string) {
    this.filtroAtivo = filtro;
  }
}
