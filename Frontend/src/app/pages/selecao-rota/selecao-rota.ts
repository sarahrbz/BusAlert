import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-selecao-rota',
  standalone: false,
  templateUrl: './selecao-rota.html',
  styleUrl: './selecao-rota.css',
})
export class SelecaoRota {
   rotaSelecionada: any;

  constructor(private router: Router, private toast: ToastService) {}

  rotas = [
    {
      linha: '080',
      origem: 'FATEC Itu',
      destino: 'Rodoviária de Itu',
      horario: '18:10',
      tempo: '12 min',
      origemLat: -23.290250,
    origemLng: -47.296400,

    destinoLat: -23.2601498677427,
    destinoLng: -47.29551269311952
    },
    {
      linha: '031',
      origem: 'FATEC Itu',
      destino: 'Plaza Shopping Itu',
      horario: '18:15',
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
      horario: '18:20',
      tempo: '25 min',
       origemLat: -23.290250,
  origemLng: -47.296400,

  destinoLat: -23.386788922274338,
  destinoLng: -47.3360810689405
    }
  ];

  selecionarRota(rota: any) {

    this.rotaSelecionada = rota;
  }

  iniciarMonitoramento() {

    if (!this.rotaSelecionada) {
      this.toast.mostrarToast('Selecione uma rota antes de iniciar.');
      return;
    }

    localStorage.setItem(
      'rotaSelecionada',
      JSON.stringify(this.rotaSelecionada)
    );

    this.router.navigate(['/rota-monitoramento']);
  }
}
