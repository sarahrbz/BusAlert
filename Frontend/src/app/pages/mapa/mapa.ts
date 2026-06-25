import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: ''
});
@Component({
  selector: 'app-mapa',
  standalone: false,
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements OnInit{
  map: any;
  filtroAtivo = 'linhas';
  camadasLinhas: any[] = [];
  camadasPontos: any[] = [];
  camadasTransito: any[] = [];

  pontosOnibus = [
  {
    nome: 'FATEC Itu',
    descricao: 'Ponto inicial das rotas',
    lat: -23.290250,
    lng: -47.296400,
    linhas: ['080', '031', '220']
  },
  {
    nome: 'Rodoviária de Itu',
    descricao: 'Terminal rodoviário',
    lat: -23.2601498677427,
    lng: -47.29551269311952,
    linhas: ['080']
  },
  {
    nome: 'Plaza Shopping Itu',
    descricao: 'Ponto próximo ao shopping',
    lat: -23.263881244120707,
    lng: -47.28027259496379,
    linhas: ['031']
  },
  {
    nome: 'Cidade Nova',
    descricao: 'Região Cidade Nova',
    lat: -23.386788922274338,
    lng: -47.3360810689405,
    linhas: ['220']
  }
];

selecionarFiltro(filtro: string) {
  this.filtroAtivo = filtro;

  this.limparMapa();

  if (filtro === 'linhas') {
    this.mostrarLinhas();
  }

  if (filtro === 'pontos') {
    this.mostrarPontos();
  }

  if (filtro === 'transito') {
    this.mostrarTransito();
  }
}

limparMapa() {
  [
    ...this.camadasLinhas,
    ...this.camadasPontos,
    ...this.camadasTransito
  ].forEach((camada) => {
    this.map.removeLayer(camada);
  });

  this.camadasLinhas = [];
  this.camadasPontos = [];
  this.camadasTransito = [];
}

pointIcon = L.divIcon({
  html: '<i class="fas fa-location-dot"></i>',
  className: 'point-map-icon',
  iconSize: [34, 34],
  iconAnchor: [17, 17]
});

mostrarLinhas() {
  this.rotas.forEach((rota) => {
    this.buscarPercursoRota(rota);
  });}

mostrarPontos() {
  this.pontosOnibus.forEach((ponto) => {
    const marker = L.marker(
      [ponto.lat, ponto.lng],
      {
        icon: this.pointIcon
      }
    ).addTo(this.map);

    marker.bindPopup(`
      <strong>${ponto.nome}</strong><br>
      ${ponto.descricao}<br>
      Linhas: ${ponto.linhas.join(', ')}
    `);

    this.camadasPontos.push(marker);
  });
}

mostrarTransito() {
  const trechos = [
    {
      status: 'Livre',
      cor: '#22c55e',
      origemLat: -23.290250,
      origemLng: -47.296400,
      destinoLat: -23.276000,
      destinoLng: -47.293000
    },
    {
      status: 'Moderado',
      cor: '#f59e0b',
      origemLat: -23.276000,
      origemLng: -47.293000,
      destinoLat: -23.263881,
      destinoLng: -47.280272
    },
    {
      status: 'Lento',
      cor: '#ef4444',
      origemLat: -23.290250,
      origemLng: -47.296400,
      destinoLat: -23.260149,
      destinoLng: -47.295512
    }
  ];

  trechos.forEach((trecho) => {

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${trecho.origemLng},${trecho.origemLat};` +
      `${trecho.destinoLng},${trecho.destinoLat}` +
      `?overview=full&geometries=geojson`;

    this.http.get<any>(url).subscribe({
      next: (res) => {

        const pontos =
          res.routes[0].geometry.coordinates.map((coord: any) => {
            return [coord[1], coord[0]] as [number, number];
          });

        const linha = L.polyline(pontos, {
          color: trecho.cor,
          weight: 7,
          opacity: 0.8
        }).addTo(this.map);

        linha.bindPopup(`
          <strong>Trânsito ${trecho.status}</strong>
        `);

        this.camadasTransito.push(linha);
      }
    });

  });
}

  constructor(private http: HttpClient){}

  rotas = [
    {
      linha: '080',
      origem: 'FATEC Itu',
      destino: 'Rodoviária de Itu',
      tempo: '3 min',
      cor: '#5f73ff',
      origemLat: -23.290250,
      origemLng: -47.296400,
      destinoLat: -23.2601498677427,
      destinoLng: -47.29551269311952
    },
    {
      linha: '031',
      origem: 'FATEC Itu',
      destino: 'Plaza Shopping Itu',
      tempo: '5 min',
      cor: '#ff9f1c',
      origemLat: -23.290250,
      origemLng: -47.296400,
      destinoLat: -23.263881244120707,
      destinoLng: -47.28027259496379
    }
  ];

  busIcon = L.divIcon({
    html: '<i class="fas fa-bus"></i>',
    className: 'bus-map-icon',
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });

  ngOnInit(): void {
    setTimeout(() => {
      this.inicializarMapa();
    }, 100);
  }

   inicializarMapa() {

    this.map = L.map('mapa-geral').setView(
      [-23.276, -47.292],
      13
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap'
      }
    ).addTo(this.map);

     this.mostrarLinhas();

    this.rotas.forEach((rota) => {
       this.buscarPercursoRota(rota);

    });
  }

  buscarPercursoRota(rota: any) {

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${rota.origemLng},${rota.origemLat};` +
    `${rota.destinoLng},${rota.destinoLat}` +
    `?overview=full&geometries=geojson`;

  this.http.get<any>(url).subscribe({

    next: (res) => {

      const coordenadas =
        res.routes[0].geometry.coordinates;

      const pontos = coordenadas.map((coord: any) => {
        return [
          coord[1],
          coord[0]
        ] as [number, number];
      });

      const linha = L.polyline(pontos, {
        color: rota.cor,
        weight: 5,
        opacity: 0.85
      }).addTo(this.map);

      const pontoMedio =
        pontos[Math.floor(pontos.length / 2)];

      const marker = L.marker(
        pontoMedio,
        { icon: this.busIcon }
      ).addTo(this.map);

      marker.bindPopup(`
        <strong>Linha ${rota.linha}</strong><br>
        ${rota.origem} → ${rota.destino}<br>
        Previsão: ${rota.tempo}
      `);

      this.camadasLinhas.push(linha, marker);

    },

    error: () => {
      console.warn(
        'Não foi possível carregar rota:',
        rota.linha
      );
    }
  });
}

}
