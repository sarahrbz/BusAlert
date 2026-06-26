import { Component } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  standalone: false,
  templateUrl: './notificacoes.html',
  styleUrl: './notificacoes.css',
})
export class Notificacoes {

   filtroAtivo = 'todas';

  notificacoes = [
    {
      tipo: 'alerta',
      icone: 'fa-bell',
      titulo: 'Alarme de parada',
      mensagem: 'Sua parada está a aproximadamente 5 km.',
      hora: '08:10',
      linha: '080',
      rota: 'FATEC Itu → Rodoviária de Itu',
      cor: 'laranja'
    },
    {
      tipo: 'rotas',
      icone: 'fa-bus',
      titulo: 'Ônibus próximo',
      mensagem: 'O ônibus da linha 080 está se aproximando.',
      hora: '08:05',
      linha: '080',
      rota: 'FATEC Itu → Rodoviária de Itu',
      cor: 'azul'
    },
    {
      tipo: 'alerta',
      icone: 'fa-location-dot',
      titulo: 'Chegada prevista',
      mensagem: 'Você está próximo ao destino final.',
      hora: '08:02',
      linha: '080',
      rota: 'FATEC Itu → Rodoviária de Itu',
      cor: 'verde'
    },
    {
      tipo: 'sistema',
      icone: 'fa-circle-info',
      titulo: 'Informação de rota',
      mensagem: 'Trajeto recalculado com base no percurso atual.',
      hora: '12:00',
      linha: '031',
      rota: 'FATEC Itu → Plaza Shopping Itu',
      cor: 'azul'
    }
  ];

  get notificacoesFiltradas() {
    if (this.filtroAtivo === 'todas') {
      return this.notificacoes;
    }

    return this.notificacoes.filter(
      n => n.tipo === this.filtroAtivo
    );
  }

  selecionarFiltro(filtro: string) {
    this.filtroAtivo = filtro;
  }

  limparNotificacoes() {
    this.notificacoes = [];
  }
}
