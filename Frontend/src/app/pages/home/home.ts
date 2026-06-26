import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

   usuario: any;

    localizacaoAtiva = false;

    latitude?: number;
    longitude?: number;

    rotas: any[] = [];

    constructor(private router: Router, private toast: ToastService) {}

    ativarLocalizacao() {

  navigator.geolocation.getCurrentPosition(

    (position) => {

      this.localizacaoAtiva = true;

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      localStorage.setItem('localizacaoAtiva', 'true');

localStorage.setItem(
  'localizacaoUsuario',
  JSON.stringify({
    latitude: this.latitude,
    longitude: this.longitude
  })
);

      this.carregarRotasProximas();

    },

    (error) => {

      this.toast.mostrarToast(
        'Não foi possível obter sua localização.'
      );

    }

  );

}

carregarRotasProximas() {

  this.rotas = [

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

}

selecionarRota(rota: any) {


  localStorage.setItem(
    'rotaSelecionada',
    JSON.stringify(rota)
  );

   this.router.navigate([
    '/rota-monitoramento'
  ]);

}

  ngOnInit(): void {
    const usuarioSalvo =
      localStorage.getItem('usuario');

    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }

    const localizacaoAtiva =
  localStorage.getItem('localizacaoAtiva');

const localizacaoUsuario =
  localStorage.getItem('localizacaoUsuario');

if (
  localizacaoAtiva === 'true' &&
  localizacaoUsuario
) {
  const localizacao =
    JSON.parse(localizacaoUsuario);

  this.localizacaoAtiva = true;
  this.latitude = localizacao.latitude;
  this.longitude = localizacao.longitude;

  this.carregarRotasProximas();
}

  }

  abrirMapaPontos() {

  this.router.navigate(
    ['/mapa'],
    {
      queryParams: {
        filtro: 'pontos'
      }
    }
  );

}
}
