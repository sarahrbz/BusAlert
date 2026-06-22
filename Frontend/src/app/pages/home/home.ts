import { Component, OnInit } from '@angular/core';

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

    ativarLocalizacao() {

  navigator.geolocation.getCurrentPosition(

    (position) => {

      this.localizacaoAtiva = true;

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.carregarRotasProximas();

    },

    () => {

      alert(
        'Não foi possível obter sua localização.'
      );

    }

  );

}

carregarRotasProximas() {

  this.rotas = [

    {
      linha: '473',
      origem: 'Centro',
      destino: 'Terminal Norte',
      horario: '09:45',
      tempo: '25 min'
    },

    {
      linha: '218',
      origem: 'Bairro Jardim',
      destino: 'Centro',
      horario: '09:50',
      tempo: '32 min'
    },

    {
      linha: '560',
      origem: 'Shopping',
      destino: 'Terminal Sul',
      horario: '10:00',
      tempo: '28 min'
    }

  ];

}

  ngOnInit(): void {
    const usuarioSalvo =
      localStorage.getItem('usuario');

    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }
}
